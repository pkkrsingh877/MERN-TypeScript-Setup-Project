"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Joke_1 = __importDefault(require("../models/Joke"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// Create a Joke
router.post('/', authMiddleware_1.default, async (req, res) => {
    const { content } = req.body;
    try {
        const newJoke = await Joke_1.default.create({ content, user: req.user });
        res.status(201).json(newJoke);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred.' });
        }
    }
});
// Get all Jokes
router.get('/', async (req, res) => {
    try {
        const jokes = await Joke_1.default.find().populate('user', 'username');
        res.json(jokes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.default = router;
