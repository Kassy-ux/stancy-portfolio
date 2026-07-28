import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const required = (name: string, minLength = 1): string => {
    const value = process.env[name];
    if (!value || value.trim().length < minLength) {
        throw new Error(
            `Missing or invalid env var ${name}` +
            (minLength > 1 ? ` — must be at least ${minLength} characters` : '')
        );
    }
    return value;
};

export const isProduction = process.env.NODE_ENV === 'production';

// Fail fast at boot rather than at the first request that needs the value.
// A short JWT secret is brute-forceable offline, so it gets a hard floor.
export const env = {
    port: Number(process.env.PORT) || 5000,
    clientUrl: required('CLIENT_URL'),
    databaseUrl: required('DATABASE_URL'),
    jwtSecret: required('JWT_SECRET', 32),
    cloudinary: {
        cloudName: required('CLOUDINARY_CLOUD_NAME'),
        apiKey: required('CLOUDINARY_API_KEY'),
        apiSecret: required('CLOUDINARY_API_SECRET'),
    },
};
