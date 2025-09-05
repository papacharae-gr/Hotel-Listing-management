import type { Listing } from '../../domain/listing.model';


// --- Mock Data & Store ---
const MOCK_LISTING: Listing = {
id: 'listing-123',
name: 'Grand Plaza Hotel',
description:
'A luxurious hotel in the heart of the city with stunning views and world-class amenities. Perfect for business travelers and tourists alike.',
amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant'],
rating: 4.5,
location: {
city: 'New York',
country: 'USA',
},
};


let LISTING_DB: Listing = { ...MOCK_LISTING };


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));


// --- Gateway API ---
export async function getListing(id: string): Promise<Listing> {
await delay(400); // simulate network
if (id !== LISTING_DB.id) {
throw new Error('Listing not found');
}
return { ...LISTING_DB };
}


export type UpdateListingInput = Pick<Listing, 'name' | 'description' | 'amenities'>;


export async function updateListing(
id: string,
data: UpdateListingInput
): Promise<Listing> {
await delay(500); // simulate network
if (id !== LISTING_DB.id) {
throw new Error('Listing not found');
}
LISTING_DB = { ...LISTING_DB, ...data };
return { ...LISTING_DB };
}