import { Router } from "express";
import { createCommunity, getAllCommunities, getCommunityById, updateCommunity, deleteCommunity, uploadCommunityLogo } from "./community.controller";
import { upload, uploadToCloudinary } from '../Middleware/upload';
import { authenticate } from '../Middleware/auth';

export const CommunityRouter = Router();

/**
 * @openapi
 * /communities:
 *   get:
 *     tags:
 *       - "\U0001F513 Community (Public)"
 *     summary: Get all community entries
 *     responses:
 *       200:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Community'
 *   post:
 *     tags:
 *       - "\U0001F510 Community (Admin)"
 *     summary: Create a community entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityBody'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
CommunityRouter.get("/communities", getAllCommunities);

/**
 * @openapi
 * /communities/{communityId}:
 *   get:
 *     tags:
 *       - "\U0001F513 Community (Public)"
 *     summary: Get a community entry by ID
 *     parameters:
 *       - name: communityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Community'
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - "\U0001F510 Community (Admin)"
 *     summary: Update a community entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: communityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityBody'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - "\U0001F510 Community (Admin)"
 *     summary: Delete a community entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: communityId
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
CommunityRouter.get("/communities/:communityId", getCommunityById);
CommunityRouter.post("/communities", authenticate, createCommunity);
CommunityRouter.put("/communities/:communityId", authenticate, updateCommunity);
CommunityRouter.delete("/communities/:communityId", authenticate, deleteCommunity);

/**
 * @openapi
 * /communities/{communityId}/logo:
 *   post:
 *     tags:
 *       - "🔐 Community (Admin)"
 *     summary: Upload community logo to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: communityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Community not found
 */
CommunityRouter.post("/communities/:communityId/logo", authenticate, upload.single('logo'), uploadToCloudinary('portfolio/community'), uploadCommunityLogo);
