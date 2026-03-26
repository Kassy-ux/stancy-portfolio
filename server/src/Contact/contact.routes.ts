import { Router } from 'express';
import {
    getAllContactMessages,
    getContactMessageById,
    createContactMessage,
    markContactMessageRead,
    deleteContactMessage
} from './contact.controller';
import { authenticate } from '../Middleware/auth';

export const ContactRouter = Router();

/**
 * @openapi
 * /contact:
 *   post:
 *     tags:
 *       - "🔓 Contact (Public)"
 *     summary: Submit a contact message
 *   get:
 *     tags:
 *       - "🔐 Contact (Admin)"
 *     summary: Get all contact messages
 *     security:
 *       - bearerAuth: []
 */
ContactRouter.post('/', createContactMessage);
ContactRouter.get('/', authenticate, getAllContactMessages);

/**
 * @openapi
 * /contact/{id}:
 *   get:
 *     tags:
 *       - "🔐 Contact (Admin)"
 *     summary: Get a message by ID
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Contact (Admin)"
 *     summary: Delete a contact message
 *     security:
 *       - bearerAuth: []
 */
ContactRouter.get('/:id', authenticate, getContactMessageById);
ContactRouter.delete('/:id', authenticate, deleteContactMessage);

/**
 * @openapi
 * /contact/{id}/read:
 *   patch:
 *     tags:
 *       - "🔐 Contact (Admin)"
 *     summary: Mark a message as read
 *     security:
 *       - bearerAuth: []
 */
ContactRouter.patch('/:id/read', authenticate, markContactMessageRead);