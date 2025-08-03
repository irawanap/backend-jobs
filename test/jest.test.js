require("dotenv").config() // Tambahkan baris ini di paling atas

const request = require("supertest")
const prisma = require("../model/prisma") // Import prisma client directly

let app // Declare app here, will be initialized in beforeAll

describe("API Authentication and User Tests", () => {
  let token // Will store the JWT token after login
  let userId // Will store the UUID string from registration
  const testUser = {
    email: "testuser@example.com",
    password: "password123",
    name: "Test User",
  }

  beforeAll(async () => {
    // Import app only after setup is ready
    app = require("../server")

    // Clean the test database before all tests
    await prisma.job.deleteMany({}) // Clean jobs table
    await prisma.user.deleteMany({}) // Clean users table
  })

  afterAll(async () => {
    // Clean the test database after all tests
    await prisma.job.deleteMany({}) // Clean jobs table
    await prisma.user.deleteMany({}) // Clean users table
    await prisma.$disconnect() // Disconnect Prisma client
  })

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/auth/register").send(testUser).expect(201)

      expect(response.body).toHaveProperty("success", true)
      expect(response.body).toHaveProperty("message", "User registered successfully.")
      expect(response.body).toHaveProperty("data")
      expect(response.body.data.email).toBe(testUser.email)
      expect(response.body.data).toHaveProperty("id")
      userId = response.body.data.id // Store userId for later use
    })

    it("should fail to register with existing email", async () => {
      const response = await request(app).post("/api/auth/register").send(testUser).expect(400)

      expect(response.body).toHaveProperty("success", false)
      expect(response.body).toHaveProperty("message", "User with this email already exists.")
    })
  })

  describe("POST /api/auth/login", () => {
    it("should login and return token", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)

      expect(response.body).toHaveProperty("success", true)
      expect(response.body).toHaveProperty("message", "Login successful.")
      expect(response.body).toHaveProperty("token")
      expect(response.body).toHaveProperty("data")
      expect(response.body.data.email).toBe(testUser.email)
      token = response.body.token // Store token for later use
    })

    it("should fail login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword",
        })
        .expect(400)

      expect(response.body).toHaveProperty("success", false)
      expect(response.body).toHaveProperty("message", "Invalid credentials.")
    })
  })

  describe("GET /api/users", () => {
    it("should get all users", async () => {
      const response = await request(app).get("/api/users").expect(200)

      expect(response.body).toHaveProperty("success", true)
      expect(response.body).toHaveProperty("message", "Get All Users Successfully")
      expect(response.body).toHaveProperty("data")
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBeGreaterThan(0)

      const foundUser = response.body.data.find((user) => user.id === userId)
      expect(foundUser).toBeDefined()
      expect(foundUser.email).toBe(testUser.email)
      expect(foundUser.name).toBe(testUser.name)
      expect(foundUser).not.toHaveProperty("password")
    })
  })

  describe("Job API Tests", () => {
    let jobId // To store the ID of the created job

    const testJob = {
      company: "Acme Corp",
      position: "Software Engineer",
      status: "applied",
      appliedDate: "2024-07-25T10:00:00Z",
      jobType: "Full-time",
      source: "LinkedIn",
      notes: "Excited about this role.",
    }

    it("should create a new job for the authenticated user", async () => {
      const response = await request(app)
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`) // Use the token from login
        .send(testJob)
        .expect(201)

      expect(response.body).toHaveProperty("success", true)
      expect(response.body).toHaveProperty("message", "Job successfully inputted.")
      expect(response.body).toHaveProperty("data")
      expect(response.body.data).toHaveProperty("id")
      expect(response.body.data.userId).toBe(userId) // Ensure job is linked to the correct user
      expect(response.body.data.company).toBe(testJob.company)
      expect(response.body.data.position).toBe(testJob.position)
      jobId = response.body.data.id // Store job ID for later tests
    })

    it("should fail to create a job without authentication", async () => {
      const response = await request(app).post("/api/jobs").send(testJob).expect(401) // No token

      expect(response.body).toHaveProperty("success", false)
      expect(response.body).toHaveProperty("message", "Not authorized, no token.")
    })

    it("should fail to create a job with invalid data (validation error)", async () => {
      const invalidJob = {
        company: "", // Missing company
        position: "", // Missing position
      }
      const response = await request(app)
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidJob)
        .expect(422) // Validation error

      expect(response.body).toHaveProperty("success", false)
      expect(response.body).toHaveProperty("message", "Validation error")
      expect(response.body.errors).toBeInstanceOf(Array)
      expect(response.body.errors.length).toBeGreaterThan(0)
    })

    it("should get all jobs for the authenticated user", async () => {
      const response = await request(app)
        .get("/api/jobs")
        .set("Authorization", `Bearer ${token}`) // Use the token
        .expect(200)

      expect(response.body).toHaveProperty("success", true)
      expect(response.body).toHaveProperty("message", "Get All Jobs Successfully")
      expect(response.body).toHaveProperty("data")
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBeGreaterThan(0)

      // Find the job created earlier
      const foundJob = response.body.data.find((job) => job.id === jobId)
      expect(foundJob).toBeDefined()
      expect(foundJob.company).toBe(testJob.company)
      expect(foundJob.position).toBe(testJob.position)
      expect(foundJob.userId).toBe(userId) // Ensure it's the correct user's job
    })
  })
})
