import db from '../db/index';
import { eq, desc } from 'drizzle-orm';
import { communityTable, TCommunityInsert, TCommunitySelect } from '../db/schema';

//CRUD OPERATIONS FOR COMMUNITY

//Get all communities

export const getAllCCommunitiesService = async (): Promise<TCommunitySelect[] | null> => {
    return await db.query.communityTable.findMany({
        orderBy: desc(communityTable.order)
    });
}

//Get a single community by ID

export const getCommunityByIdService = async (communityId: number): Promise<TCommunitySelect | undefined> => {
    const result = await db.query.communityTable.findFirst({
        where: eq(communityTable.communityId, communityId)
    });
    return result;
}

//Create a new community
export const createCommunityService = async (communityData: TCommunityInsert): Promise<string> => {
    await db.insert(communityTable).values(communityData);
    return 'Community created successfully';
};

//Update an existing community
export const updateCommunityService = async (communityId: number, communityData: TCommunityInsert): Promise<string> => {
    await db.update(communityTable).set(communityData).where(eq(communityTable.communityId, communityId));
    return 'Community updated successfully';
};

//Delete a community
export const deleteCommunityService = async (communityId: number): Promise<string> => {
    await db.delete(communityTable).where(eq(communityTable.communityId, communityId));
    return 'Community deleted successfully';
};

