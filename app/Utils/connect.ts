import { PrismaClient } from '@prisma/client';

// Extending the NodeJS.Global type to include the prisma instance
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
} else {
  // In development, use a single PrismaClient instance across hot-reloads
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
