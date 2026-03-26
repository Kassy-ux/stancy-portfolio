import db from '../db/index';
import { eq, asc } from 'drizzle-orm';
import { testimonialsTable, TTestimonialInsert, TTestimonialSelect } from '../db/schema';

export const getAllTestimonialsService = async (): Promise<TTestimonialSelect[]> => {
    return await db.query.testimonialsTable.findMany({
        orderBy: asc(testimonialsTable.order)
    });
};

export const getTestimonialByIdService = async (id: number): Promise<TTestimonialSelect | undefined> => {
    return await db.query.testimonialsTable.findFirst({
        where: eq(testimonialsTable.id, id)
    });
};

export const createTestimonialService = async (data: TTestimonialInsert): Promise<string> => {
    await db.insert(testimonialsTable).values(data);
    return 'Testimonial created successfully';
};

export const updateTestimonialService = async (id: number, data: TTestimonialInsert): Promise<string> => {
    await db.update(testimonialsTable).set(data).where(eq(testimonialsTable.id, id));
    return 'Testimonial updated successfully';
};

export const deleteTestimonialService = async (id: number): Promise<string> => {
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
    return 'Testimonial deleted successfully';
};