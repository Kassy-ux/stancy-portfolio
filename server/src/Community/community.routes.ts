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
 *       - "🔓 Community (Public)"
 *     summary: Get all community entries
 *   post:
 *     tags:
 *       - "🔐 Community (Admin)"
 *     summary: Create a community entry
 *     security:
 *       - bearerAuth: []
 */
CommunityRouter.get("/", getAllCommunities);

/**
 * @openapi
 * /communities/{id}:
 *   get:
 *     tags:
 *       - "🔓 Community (Public)"
 *     summary: Get a community entry by ID
 *   put:
 *     tags:
 *       - "🔐 Community (Admin)"
 *     summary: Update a community entry
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Community (Admin)"
 *     summary: Delete a community entry
 *     security:
 *       - bearerAuth: []
 */
CommunityRouter.get("/:id", getCommunityById);
CommunityRouter.post("/", authenticate, createCommunity);
CommunityRouter.put("/:id", authenticate, updateCommunity);
CommunityRouter.delete("/:id", authenticate, deleteCommunity);

/**
 * @openapi
 * /communities/{id}/logo:
 *   post:
 *     tags:
 *       - "🔐 Community (Admin)"
 *     summary: Upload community logo to Cloudinary
 *     security:
 *       - bearerAuth: []
 */
CommunityRouter.post("/:id/logo", authenticate, upload.single('logo'), uploadToCloudinary('portfolio/community'), uploadCommunityLogo);
