import db from '../db/index';
import { eq, asc } from 'drizzle-orm';
import { skillsTable, TSkillInsert, TSkillSelect } from '../db/schema';

export const getAllSkillsService = async (): Promise<TSkillSelect[]> => {
    return await db.query.skillsTable.findMany({
        orderBy: asc(skillsTable.order)
    });
};

export const getSkillByIdService = async (skillId: number): Promise<TSkillSelect | undefined> => {
    return await db.query.skillsTable.findFirst({
        where: eq(skillsTable.skillId, skillId)
    });
};

export const createSkillService = async (data: TSkillInsert): Promise<string> => {
    await db.insert(skillsTable).values(data);
    return 'Skill created successfully';
};

export const updateSkillService = async (skillId: number, data: TSkillInsert): Promise<string> => {
    await db.update(skillsTable).set(data).where(eq(skillsTable.skillId, skillId));
    return 'Skill updated successfully';
};

export const deleteSkillService = async (skillId: number): Promise<string> => {
    await db.delete(skillsTable).where(eq(skillsTable.skillId, skillId));
    return 'Skill deleted successfully';
};