import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

// Initialize a single instance of Prisma Client
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL must be defined in your environment before starting the app.');
}

const prisma = new PrismaClient({
	adapter: new PrismaPg(databaseUrl),
});

export default prisma;