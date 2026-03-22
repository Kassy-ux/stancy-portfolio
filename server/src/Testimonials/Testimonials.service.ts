import db from '../db/index';
import { eq, asc } from 'drizzle-orm';
import { testimonialsTable, TTestimonialInsert, TTestimonialSelect } from '../db/schema';

export const getAllTestimonialsService = async (): Promise<TTestimonialSelect[]> => {
    return await db.query.testimonialsTable.findMany({
        orderBy: asc(testimonialsTable.order)
    });
};

export const getTestimonialByIdService = async (testimonialId: number): Promise<TTestimonialSelect | undefined> => {
    return await db.query.testimonialsTable.findFirst({
        where: eq(testimonialsTable.testimonialId, testimonialId)
    });
};

export const createTestimonialService = async (data: TTestimonialInsert): Promise<string> => {
    await db.insert(testimonialsTable).values(data);
    return 'Testimonial created successfully';
};

export const updateTestimonialService = async (testimonialId: number, data: TTestimonialInsert): Promise<string> => {
    await db.update(testimonialsTable).set(data).where(eq(testimonialsTable.testimonialId, testimonialId));
    return 'Testimonial updated successfully';
};

export const deleteTestimonialService = async (testimonialId: number): Promise<string> => {
    await db.delete(testimonialsTable).where(eq(testimonialsTable.testimonialId, testimonialId));
    return 'Testimonial deleted successfully';
};