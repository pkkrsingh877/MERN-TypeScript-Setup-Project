import { Router, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

// User Registration
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error ) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred.' });
        }
    }
});

// User Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ message: 'Invalid credentials' });
            return 
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred.' });
        }
    }
});

export default router;
