const request = require('supertest');

// Import app hanya setelah setup selesai
let app;
let getPrisma;

describe('API Authentication Tests', () => {
  let token;
  let userId;
  const testUser = {
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User'
  };

  beforeAll(async () => {
    // Import setelah Prisma client ter-generate
    app = require('../server');
    ({ getPrisma } = require('../config/prisma'));
    
    // Bersihkan database test
    const prisma = getPrisma();
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    if (getPrisma) {
      const prisma = getPrisma();
      await prisma.user.deleteMany({});
      await prisma.$disconnect();
    }
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);
      userId = response.body.user.id;
    });

    it('should fail to register with existing email', async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(400);
    });
  });

  describe('POST /login', () => {
    it('should login and return token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      token = response.body.token;
    });

    it('should fail login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Protected Routes', () => {
    it('should access protected route with valid token', async () => {
      await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should fail to access protected route without token', async () => {
      await request(app)
        .get('/api/user/profile')
        .expect(401);
    });

    it('should fail to access protected route with invalid token', async () => {
      await request(app)
        .get('/api/user/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);
    });
  });

  describe('POST /logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
    });
  });
});