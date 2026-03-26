import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    id?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized - no token provided' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        req.id = decoded.id;
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized - invalid token' });
    }
};