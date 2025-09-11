import type { Hotel } from '../../domain/hotel.model';
import { httpClient, API_BASE_HOTELS } from '../../../../lib/httpClient';

// 1. Base API URL
const API_BASE = API_BASE_HOTELS;

// 2. Get all listings (hotels)
export async function getListings(): Promise<Hotel[]> {
	const res = await httpClient.get(`${API_BASE}`);
	// The API returns { data: { data: Hotel[], ...meta } }
	const hotels = res.data?.data?.data || [];
	// Add fallback for missing fields
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return Array.isArray(hotels) ? hotels.map((h: any) => ({
		...h,
		location: h.location || { city: '-', country: '-' },
		rating: h.rating ?? 0,
		//amenities: h.amenities ?? [],
	})) : [];
}

// 4. Get single listing by id
export async function getListing(id: string): Promise<Hotel> {
		const res = await httpClient.get(`${API_BASE}/${id}`);
		// 5. The API returns { data: { ... } }
		const h = res.data.data;
		return {
			...h,
			location: h.location || { city: '-', country: '-' },
			rating: h.rating ?? 0,
		};
}

// 6. Create new listing
export async function createListing(data: Omit<Hotel, 'id'>): Promise<Hotel> {
	const res = await httpClient.post(`${API_BASE}`, data);
	return res.data.data;
}

// 7. Update listing by id
export async function updateListing(id: string, data: Partial<Hotel>): Promise<Hotel> {
	const res = await httpClient.put(`${API_BASE}/${id}`, data);
	return res.data.data;
}

// 8. Delete listing by id
export async function deleteListing(id: string): Promise<void> {
	await httpClient.delete(`${API_BASE}/${id}`);
}