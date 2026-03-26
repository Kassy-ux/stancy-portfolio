import db from '../db/index';
import { eq, desc } from 'drizzle-orm';
import { contactMessagesTable, TContactMessageInsert, TContactMessageSelect } from '../db/schema';

// Get all contact messages (admin)
export const getAllContactMessagesService = async (): Promise<TContactMessageSelect[]> => {
    return await db.query.contactMessagesTable.findMany({
        orderBy: desc(contactMessagesTable.createdAt)
    });
};

// Get a single contact message by ID (admin)
export const getContactMessageByIdService = async (id: number): Promise<TContactMessageSelect | undefined> => {
    return await db.query.contactMessagesTable.findFirst({
        where: eq(contactMessagesTable.id, id)
    });
};

// Create a new contact message (public)
export const createContactMessageService = async (data: TContactMessageInsert): Promise<string> => {
    await db.insert(contactMessagesTable).values(data);
    return 'Message sent successfully';
};

// Mark a contact message as read (admin)
export const markContactMessageReadService = async (id: number): Promise<string> => {
    await db.update(contactMessagesTable)
        .set({ read: true })
        .where(eq(contactMessagesTable.id, id));
    return 'Message marked as read';
};

// Delete a contact message (admin)
export const deleteContactMessageService = async (id: number): Promise<string> => {
    await db.delete(contactMessagesTable).where(eq(contactMessagesTable.id, id));
    return 'Message deleted successfully';
};