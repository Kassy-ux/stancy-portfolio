import { Request, Response } from "express";
import { getAllCCommunitiesService, getCommunityByIdService, createCommunityService, updateCommunityService, deleteCommunityService } from "./community.services";

// GET /api/community
export const getAllCommunities = async (req: Request, res: Response) => {
    try {
        const existingCommunities = await getAllCCommunitiesService();
        if (!existingCommunities || existingCommunities.length === 0) {
            res.status(404).json({ message: "No communities found" });
            return;
        }
        res.status(200).json(existingCommunities);
    } catch (error) {
        console.error("Error fetching communities:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
};

// GET /api/community/:communityId
export const getCommunityById = async (req: Request, res: Response) => {
    const communityId = parseInt(req.params.communityId as string);
    if (isNaN(communityId)) {
        res.status(400).json({ error: "Invalid community ID" });
        return;
    }
    try {
        const communityData = await getCommunityByIdService(communityId);
        if (!communityData) {
            res.status(404).json({ error: "Community not found" });
            return;
        }
        res.status(200).json(communityData);
    } catch (error) {
        console.error("Error fetching community:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
};

// POST /api/community
export const createCommunity = async (req: Request, res: Response) => {
    const { name, role, description, logoUrl, bioUrl, order } = req.body;
    if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    try {
        const result = await createCommunityService({ name, role, description, logoUrl, bioUrl, order });
        res.status(201).json({ message: result });
    } catch (error) {
        console.error("Error creating community:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
};

// PUT /api/community/:communityId
export const updateCommunity = async (req: Request, res: Response) => {
    const communityId = parseInt(req.params.communityId as string);
    if (isNaN(communityId)) {
        res.status(400).json({ error: "Invalid community ID" });
        return;
    }
    const { name, role, description, logoUrl, bioUrl, order } = req.body;
    if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    try {
        const result = await updateCommunityService(communityId, { name, role, description, logoUrl, bioUrl, order });
        res.status(200).json({ message: result });
    } catch (error) {
        console.error("Error updating community:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
};

// DELETE /api/community/:communityId
export const deleteCommunity = async (req: Request, res: Response) => {
    const communityId = parseInt(req.params.communityId as string);
    if (isNaN(communityId)) {
        res.status(400).json({ error: "Invalid community ID" });
        return;
    }
    try {
        const result = await deleteCommunityService(communityId);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error("Error deleting community:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
};

// POST /api/communities/:communityId/logo — upload community logo to Cloudinary
export const uploadCommunityLogo = async (req: Request, res: Response) => {
    const communityId = parseInt(req.params.communityId as string);
    if (isNaN(communityId)) {
        res.status(400).json({ error: "Invalid community ID" });
        return;
    }
    const logoUrl = (req.file as any)?.path;
    if (!logoUrl) {
        res.status(400).json({ error: "No image file provided" });
        return;
    }
    try {
        const existing = await getCommunityByIdService(communityId);
        if (!existing) {
            res.status(404).json({ error: "Community not found" });
            return;
        }
        const result = await updateCommunityService(communityId, { ...existing, logoUrl });
        res.status(200).json({ message: result, logoUrl });
    } catch (error) {
        console.error("Error uploading community logo:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
};