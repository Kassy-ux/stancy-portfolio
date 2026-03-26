import db from '../db/index';
import { eq } from 'drizzle-orm';
import { usersTable, TUserInsert, TUserSelect } from '../db/schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUserService = async (email: string, password: string): Promise<string> => {
    const existing = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email)
    });
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, 12);
    await db.insert(usersTable).values({ email, passwordHash });
    return 'Admin registered successfully';
};

export const loginUserService = async (email: string, password: string): Promise<string> => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email)
    });
    if (!user) throw new Error('Invalid email or password');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new Error('Invalid email or password');

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );
    return token;
};