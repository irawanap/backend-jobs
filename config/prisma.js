const { PrismaClient } = require('@prisma/client');

let prisma;

function getPrismaInstance() {
    if (!prisma) {
        prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
        });
    }
    return prisma;
}

module.exports = { getPrisma: getPrismaInstance };