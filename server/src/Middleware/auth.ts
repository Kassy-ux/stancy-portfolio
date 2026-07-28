import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import db from '../db/index';
import { usersTable } from '../db/schema';
import { env } from '../config/env';

export interface AuthRequest extends Request {
    id?: number;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized - no token provided' });
        return;
    }

    let decoded: { id: number };
    try {
        decoded = jwt.verify(token, env.jwtSecret) as { id: number };
    } catch {
        res.status(401).json({ error: 'Unauthorized - invalid token' });
        return;
    }

    try {
        // A valid signature is not enough — the account may have been deleted
        // since the 7-day token was issued.
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, decoded.id),
            columns: { id: true },
        });
        if (!user) {
            res.status(401).json({ error: 'Unauthorized - account no longer exists' });
            return;
        }
        req.id = user.id;
        next();
    } catch (error) {
        next(error);
    }
};
