import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { Schema } from 'mongoose';

// Extending the Express Request interface globally
declare global {
    namespace Express {
        interface Request {
            user?: Schema.Types.ObjectId;
        }
    }
}

interface IRequest extends Request {
    user?: Schema.Types.ObjectId;
}

const authMiddleware = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = verified?.id ? new Schema.Types.ObjectId(verified.id) : undefined;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
