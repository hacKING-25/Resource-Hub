import { Router, Request, Response } from 'express';
import prisma from '../db.js';
import bcrypt from 'bcrypt';

const router = Router();

/**
 * 👤 ROUTE: Create a New User
 * POST /api/users
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
        return;
    }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      

    res.status(201).json({
      message: 'User created successfully!',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'A user with this email already exists.' });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;