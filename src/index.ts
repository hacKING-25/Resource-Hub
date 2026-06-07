import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';

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

app.use('/api/users', userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running safely at http://localhost:${PORT}`);
});