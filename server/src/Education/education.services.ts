import db from '../db/index';
import { eq, asc } from 'drizzle-orm';
import { educationTable, TEducationInsert, TEducationSelect } from '../db/schema';

export const getAllEducationService = async (): Promise<TEducationSelect[]> => {
    return await db.query.educationTable.findMany({
        orderBy: asc(educationTable.order)
    });
};

export const getEducationByIdService = async (educationId: number): Promise<TEducationSelect | undefined> => {
    return await db.query.educationTable.findFirst({
        where: eq(educationTable.educationId, educationId)
    });
};

export const createEducationService = async (data: TEducationInsert): Promise<string> => {
    await db.insert(educationTable).values(data);
    return 'Education entry created successfully';
};

export const updateEducationService = async (educationId: number, data: TEducationInsert): Promise<string> => {
    await db.update(educationTable).set(data).where(eq(educationTable.educationId, educationId));
    return 'Education entry updated successfully';
};

export const deleteEducationService = async (educationId: number): Promise<string> => {
    await db.delete(educationTable).where(eq(educationTable.educationId, educationId));
    return 'Education entry deleted successfully';
};