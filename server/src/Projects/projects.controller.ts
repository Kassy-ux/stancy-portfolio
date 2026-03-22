import { Request, Response } from 'express';
import {
    getAllProjectsService,
    getFeaturedProjectsService,
    getProjectByIdService,
    createProjectService,
    updateProjectService,
    deleteProjectService,
    toggleFeaturedProjectService
} from './projects.services';

// GET /api/projects
export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await getAllProjectsService();
        res.status(200).json(projects);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/projects/featured
export const getFeaturedProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await getFeaturedProjectsService();
        res.status(200).json(projects);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/projects/:projectId
export const getProjectById = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId as string);
    if (isNaN(projectId)) {
        res.status(400).json({ error: 'Invalid project ID' });
        return;
    }
    try {
        const project = await getProjectByIdService(projectId);
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.status(200).json(project);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/projects
export const createProject = async (req: Request, res: Response) => {
    const { title, description, techStack, imageUrl, liveUrl, githubUrl, featured, order } = req.body;
    if (!title || !description || !techStack) {
        res.status(400).json({ error: 'Title, description, and techStack are required' });
        return;
    }
    // techStack can be sent as comma-separated string or array
    const techStackArray = Array.isArray(techStack) ? techStack : techStack.split(',').map((s: string) => s.trim());
    try {
        const result = await createProjectService({ title, description, techStack: techStackArray, imageUrl, liveUrl, githubUrl, featured, order });
        res.status(201).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// PUT /api/projects/:projectId
export const updateProject = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId as string);
    if (isNaN(projectId)) {
        res.status(400).json({ error: 'Invalid project ID' });
        return;
    }
    const { title, description, techStack, imageUrl, liveUrl, githubUrl, featured, order } = req.body;
    if (!title || !description || !techStack) {
        res.status(400).json({ error: 'Title, description, and techStack are required' });
        return;
    }
    const techStackArray = Array.isArray(techStack) ? techStack : techStack.split(',').map((s: string) => s.trim());
    try {
        const result = await updateProjectService(projectId, { title, description, techStack: techStackArray, imageUrl, liveUrl, githubUrl, featured, order });
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// DELETE /api/projects/:projectId
export const deleteProject = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId as string);
    if (isNaN(projectId)) {
        res.status(400).json({ error: 'Invalid project ID' });
        return;
    }
    try {
        const result = await deleteProjectService(projectId);
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// PATCH /api/projects/:projectId/featured — toggle featured flag
export const toggleFeaturedProject = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId as string);
    if (isNaN(projectId)) {
        res.status(400).json({ error: 'Invalid project ID' });
        return;
    }
    try {
        const result = await toggleFeaturedProjectService(projectId);
        res.status(200).json(result);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(message === 'Project not found' ? 404 : 500).json({ error: message });
    }
};

// POST /api/projects/:projectId/image  — upload project image via Cloudinary
export const uploadProjectImage = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId as string);
    if (isNaN(projectId)) {
        res.status(400).json({ error: 'Invalid project ID' });
        return;
    }
    const imageUrl = (req.file as any)?.path;
    if (!imageUrl) {
        res.status(400).json({ error: 'No image file provided' });
        return;
    }
    try {
        const project = await getProjectByIdService(projectId);
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        const result = await updateProjectService(projectId, { ...project, imageUrl });
        res.status(200).json({ message: result, imageUrl });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};