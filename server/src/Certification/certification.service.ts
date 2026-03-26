import db from '../db/index';
import { eq, asc } from 'drizzle-orm';
import { certificationsTable, TCertificationInsert, TCertificationSelect } from '../db/schema';

export const getAllCertificationsService = async (): Promise<TCertificationSelect[]> => {
    return await db.query.certificationsTable.findMany({
        orderBy: asc(certificationsTable.order)
    });
};

export const getCertificationByIdService = async (id: number): Promise<TCertificationSelect | undefined> => {
    return await db.query.certificationsTable.findFirst({
        where: eq(certificationsTable.id, id)
    });
};

export const createCertificationService = async (data: TCertificationInsert): Promise<string> => {
    await db.insert(certificationsTable).values(data);
    return 'Certification entry created successfully';
};

export const updateCertificationService = async (id: number, data: TCertificationInsert): Promise<string> => {
    await db.update(certificationsTable).set(data).where(eq(certificationsTable.id, id));
    return 'Certification entry updated successfully';
};

export const deleteCertificationService = async (id: number): Promise<string> => {
    await db.delete(certificationsTable).where(eq(certificationsTable.id, id));
    return 'Certification entry deleted successfully';
};