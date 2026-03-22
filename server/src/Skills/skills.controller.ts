import { Request, Response } from 'express';
import {
    getAllSkillsService,
    getSkillByIdService,
    createSkillService,
    updateSkillService,
    deleteSkillService
} from './skills.services';

// GET /api/skills
export const getAllSkills = async (_req: Request, res: Response) => {
    try {
        const skills = await getAllSkillsService();
        res.status(200).json(skills);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/skills/:skillId
export const getSkillById = async (req: Request, res: Response) => {
    const skillId = parseInt(req.params.skillId as string);
    if (isNaN(skillId)) {
        res.status(400).json({ error: 'Invalid skill ID' });
        return;
    }
    try {
        const skill = await getSkillByIdService(skillId);
        if (!skill) {
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.status(200).json(skill);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/skills
export const createSkill = async (req: Request, res: Response) => {
    const { name, category, iconUrl, order } = req.body;
    if (!name || !category) {
        res.status(400).json({ error: 'Name and category are required' });
        return;
    }
    try {
        const result = await createSkillService({ name, category, iconUrl, order });
        res.status(201).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// PUT /api/skills/:skillId
export const updateSkill = async (req: Request, res: Response) => {
    const skillId = parseInt(req.params.skillId as string);
    if (isNaN(skillId)) {
        res.status(400).json({ error: 'Invalid skill ID' });
        return;
    }
    const { name, category, iconUrl, order } = req.body;
    if (!name || !category) {
        res.status(400).json({ error: 'Name and category are required' });
        return;
    }
    try {
        const result = await updateSkillService(skillId, { name, category, iconUrl, order });
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// DELETE /api/skills/:skillId
export const deleteSkill = async (req: Request, res: Response) => {
    const skillId = parseInt(req.params.skillId as string);
    if (isNaN(skillId)) {
        res.status(400).json({ error: 'Invalid skill ID' });
        return;
    }
    try {
        const result = await deleteSkillService(skillId);
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/skills/:skillId/icon  — upload skill icon via Cloudinary
export const uploadSkillIcon = async (req: Request, res: Response) => {
    const skillId = parseInt(req.params.skillId as string);
    if (isNaN(skillId)) {
        res.status(400).json({ error: 'Invalid skill ID' });
        return;
    }
    const iconUrl = (req.file as any)?.path;
    if (!iconUrl) {
        res.status(400).json({ error: 'No image file provided' });
        return;
    }
    try {
        const skill = await getSkillByIdService(skillId);
        if (!skill) {
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        const result = await updateSkillService(skillId, { ...skill, iconUrl });
        res.status(200).json({ message: result, iconUrl });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};