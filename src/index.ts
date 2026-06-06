import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import  prisma  from './db.js';

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

app.post('/users', async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    // Basic Validation (The Controller's job)
    if (!email || !password) {
       res.status(400).json({ error: 'Email and password are required' });
       return;
    }

    // Use Prisma to insert a row into the User table
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password, // Note: In the next lesson, we will hash this for safety!
      },
    });

    // Respond with the newly created user (excluding password for security)
    res.status(201).json({
      message: 'User created successfully!',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      }
    });
  } catch (error: any) {
    // Handle database errors (e.g., duplicate email strings)
    if (error.code === 'P2002') {
       res.status(400).json({ error: 'A user with this email already exists.' });
       return;
    }
    
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running safely at http://localhost:${PORT}`);
});