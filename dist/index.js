"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const jokeRoutes_1 = __importDefault(require("./src/routes/jokeRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parse JSON bodies
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Define Routes
app.use('/api/User', userRoutes_1.default);
app.use('/api/Jokes', jokeRoutes_1.default);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
