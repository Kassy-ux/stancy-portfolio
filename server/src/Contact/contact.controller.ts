import { Request, Response } from 'express';
import {getAllContactMessagesService,getContactMessageByIdService,createContactMessageService,markContactMessageReadService,deleteContactMessageService} from './contact.service';

// GET /api/contact
export const getAllContactMessages = async (_req: Request, res: Response) => {
    try {
        // An empty inbox is not an error — return [] so the admin panel can
        // render its empty state instead of a failure toast.
        res.status(200).json(await getAllContactMessagesService());
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/contact/:id
export const getContactMessageById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid contact message ID' });
        return;
    }
    try {
        const messageData = await getContactMessageByIdService(id);
        if (!messageData) {
            res.status(404).json({ error: 'Contact message not found' });
            return;
        }
        res.status(200).json(messageData);
    } catch (error) {
        console.error('Error fetching contact message:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/contact
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContactMessage = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).json({ error: 'Name, email, and message are required' });
        return;
    }
    // The client validates with Zod, but this endpoint is public and the
    // columns are unbounded text, so re-check server-side.
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
        res.status(400).json({ error: 'Name, email, and message must be strings' });
        return;
    }
    const trimmed = { name: name.trim(), email: email.trim(), message: message.trim() };
    if (trimmed.name.length < 2 || trimmed.name.length > 100) {
        res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
        return;
    }
    if (trimmed.email.length > 254 || !EMAIL_PATTERN.test(trimmed.email)) {
        res.status(400).json({ error: 'A valid email address is required' });
        return;
    }
    if (trimmed.message.length < 10 || trimmed.message.length > 5000) {
        res.status(400).json({ error: 'Message must be between 10 and 5000 characters' });
        return;
    }
    try {
        const result = await createContactMessageService(trimmed);
        res.status(201).json({ message: result });
    } catch (error) {
        console.error('Error creating contact message:', error);
        const msg = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: msg });
    }
};

// PATCH /api/contact/:id/read
export const markContactMessageRead = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid contact message ID' });
        return;
    }
    try {
        const result = await markContactMessageReadService(id);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error marking message as read:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// DELETE /api/contact/:id
export const deleteContactMessage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid contact message ID' });
        return;
    }
    try {
        const result = await deleteContactMessageService(id);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};