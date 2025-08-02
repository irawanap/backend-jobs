const { PrismaClient } = require("@prisma/client")

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"], // Only log errors in production
  })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"], // Log more in development
    })
  }
  prisma = global.prisma
}

module.exports = prisma // Directly export the PrismaClient instance

