import { Router } from 'express';
import {
    getAllCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification
} from './certification.controller';
import { authenticate } from '../Middleware/auth';

export const CertificationRouter = Router();

/**
 * @openapi
 * /certification:
 *   get:
 *     tags:
 *       - "🔓 Certification (Public)"
 *     summary: Get all certification entries
 *   post:
 *     tags:
 *       - "🔐 Certification (Admin)"
 *     summary: Create a certification entry
 *     security:
 *       - bearerAuth: []
 */
CertificationRouter.get('/', getAllCertifications);

/**
 * @openapi
 * /certification/{id}:
 *   get:
 *     tags:
 *       - "🔓 Certification (Public)"
 *     summary: Get a certification entry by ID
 *   put:
 *     tags:
 *       - "🔐 Certification (Admin)"
 *     summary: Update a certification entry
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Certification (Admin)"
 *     summary: Delete a certification entry
 *     security:
 *       - bearerAuth: []
 */
CertificationRouter.get('/:id', getCertificationById);
CertificationRouter.post('/', authenticate, createCertification);
CertificationRouter.put('/:id', authenticate, updateCertification);
CertificationRouter.delete('/:id', authenticate, deleteCertification);