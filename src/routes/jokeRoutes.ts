import { Router, Request, Response } from 'express';
import Joke from '../models/Joke';
import authMiddleware from '../middleware/authMiddleware';
import { Schema } from 'mongoose';

const router = Router();

// Create a Joke
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    const { content } = req.body;
    try {
        const newJoke = await Joke.create({ content, user: req.user });
        res.status(201).json(newJoke);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred.' });
        }
    }
});

// Get all Jokes
router.get('/', async (req: Request, res: Response) => {
    try {
        const jokes = await Joke.find().populate('user', 'username');
        res.json(jokes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred.' });
        }
    }
});

export default router;
