import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// A simple health-check route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Core Backend API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running safely at http://localhost:${PORT}`);
});