import rateLimit from 'express-rate-limit';

// Login is the only unauthenticated path to admin access — keep it tight.
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

// The contact form is an unauthenticated DB write, so it is a spam target.
export const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many messages sent. Try again later.' },
});

// Broad backstop for everything else.
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many requests. Try again later.' },
});
