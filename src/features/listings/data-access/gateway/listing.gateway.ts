import type { Listing } from '../../domain/listing.model';
import { getHotels } from '../../../../lib/httpClient';



// --- Mock Data & Store ---
// const MOCK_LISTING: Listing = {
// id: 'listing-123',
// name: 'Grand Plaza Hotel',
// description:
// 'A luxurious hotel in the heart of the city with stunning views and world-class amenities. Perfect for business travelers and tourists alike.',
// amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant'],
// rating: 4.5,
// location: {
// city: 'New York',
// country: 'USA',
// },
// };




// Remove old static DB logic


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));


// --- Gateway API ---

export async function getListing(id: string): Promise<Listing> {
	await delay(400); // simulate network
	try {
		const apiData = await getHotels();
		const hotels: Listing[] = apiData.data || [];
		const found = hotels.find((h) => h.id === id);
		if (found) {
			return {
				id: found.id,
				name: found.name,
				description: found.description || '',
				amenities: found.amenities || [],
				rating: found.rating || 4.5,
				location: found.location || { city: '-', country: '-' },
			};
		}
	} catch {
		// fallback to mock if API fails
	}
	// fallback mock
	const MOCK_LISTING: Listing = {
		id: 'listing-123',
		name: 'Grand Plaza Hotel',
		description: 'A luxurious hotel in the heart of the city with stunning views and world-class amenities. Perfect for business travelers and tourists alike.',
		amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant'],
		rating: 4.5,
		location: { city: 'New York', country: 'USA' },
	};
	if (id === MOCK_LISTING.id) {
		return { ...MOCK_LISTING };
	}
	throw new Error('Listing not found');
}


export type UpdateListingInput = Pick<Listing, 'name' | 'description' | 'amenities'>;


export async function updateListing(_id: string, data: UpdateListingInput

): Promise<Listing> {
	await delay(500); // simulate network
	throw new Error(`Update not implemented. Received data: ${JSON.stringify(data)}`);
}