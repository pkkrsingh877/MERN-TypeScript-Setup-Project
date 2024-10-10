"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// User Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User_1.default.create({ username, password });
        res.status(201).json({ message: 'User created', user: newUser });
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
// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User_1.default.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
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
