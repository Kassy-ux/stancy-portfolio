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
 *       - "\U0001F513 Contact (Public)"
 *     summary: Submit a contact message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactBody'
 *     responses:
 *       201:
 *         description: Message sent
 *       400:
 *         description: Missing fields
 *   get:
 *     tags:
 *       - "\U0001F510 Contact (Admin)"
 *     summary: Get all contact messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactMessage'
 *       401:
 *         description: Unauthorized
 */
ContactRouter.post('/contact', createContactMessage);
ContactRouter.get('/contact', authenticate, getAllContactMessages);

/**
 * @openapi
 * /contact/{contactMessageId}:
 *   get:
 *     tags:
 *       - "\U0001F510 Contact (Admin)"
 *     summary: Get a message by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contactMessageId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactMessage'
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - "\U0001F510 Contact (Admin)"
 *     summary: Delete a contact message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contactMessageId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       401:
 *         description: Unauthorized
 */
ContactRouter.get('/contact/:contactMessageId', authenticate, getContactMessageById);
ContactRouter.delete('/contact/:contactMessageId', authenticate, deleteContactMessage);

/**
 * @openapi
 * /contact/{contactMessageId}/read:
 *   patch:
 *     tags:
 *       - "\U0001F510 Contact (Admin)"
 *     summary: Mark a message as read
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contactMessageId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marked as read
 *       401:
 *         description: Unauthorized
 */
ContactRouter.patch('/contact/:contactMessageId/read', authenticate, markContactMessageRead);