import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import { isProduction } from '../config/env';

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
};

// Without this, multer rejections and any next(error) fall through to Express's
// default handler, which replies with an HTML stack trace instead of JSON.
export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (res.headersSent) return;

    if (err instanceof MulterError) {
        const message = err.code === 'LIMIT_FILE_SIZE'
            ? 'File is too large'
            : `Upload error: ${err.message}`;
        res.status(400).json({ error: message });
        return;
    }

    // fileFilter rejections arrive as plain Errors with a known message.
    if (err instanceof Error && err.message.startsWith('Invalid file type')) {
        res.status(400).json({ error: err.message });
        return;
    }

    console.error('Unhandled error:', err);
    res.status(500).json({
        error: isProduction || !(err instanceof Error)
            ? 'Internal Server Error'
            : err.message,
    });
};
