import db from '../db/index';
import { eq, asc, desc } from 'drizzle-orm';
import { projectsTable, TProjectInsert, TProjectSelect } from '../db/schema';

export const getAllProjectsService = async (): Promise<TProjectSelect[]> => {
    return await db.query.projectsTable.findMany({
        orderBy: asc(projectsTable.order)
    });
};

export const getFeaturedProjectsService = async (): Promise<TProjectSelect[]> => {
    return await db.query.projectsTable.findMany({
        where: eq(projectsTable.featured, true),
        orderBy: asc(projectsTable.order)
    });
};

export const getProjectByIdService = async (projectId: number): Promise<TProjectSelect | undefined> => {
    return await db.query.projectsTable.findFirst({
        where: eq(projectsTable.projectId, projectId)
    });
};

export const createProjectService = async (data: TProjectInsert): Promise<string> => {
    await db.insert(projectsTable).values(data);
    return 'Project created successfully';
};

export const updateProjectService = async (projectId: number, data: TProjectInsert): Promise<string> => {
    await db.update(projectsTable).set(data).where(eq(projectsTable.projectId, projectId));
    return 'Project updated successfully';
};

export const deleteProjectService = async (projectId: number): Promise<string> => {
    await db.delete(projectsTable).where(eq(projectsTable.projectId, projectId));
    return 'Project deleted successfully';
};

export const toggleFeaturedProjectService = async (projectId: number): Promise<{ message: string; featured: boolean }> => {
    const project = await getProjectByIdService(projectId);
    if (!project) throw new Error('Project not found');
    const newFeatured = !project.featured;
    await db.update(projectsTable).set({ featured: newFeatured }).where(eq(projectsTable.projectId, projectId));
    return { message: `Project ${newFeatured ? 'marked as featured' : 'removed from featured'}`, featured: newFeatured };
};