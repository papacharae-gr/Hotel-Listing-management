import type { Listing } from '../../domain/listing.model';
import { http } from '../../../../lib/httpClient';

// --- Gateway API ---
export async function getListing(id: string): Promise<Listing> {
	const res = await http.get<{ data: Listing }>(`/hotels/${id}`);
	return res.data.data;
}


export type UpdateListingInput = Pick<Listing, 'name' | 'description' | 'amenities'>;



export async function updateListing(
	id: string,
	data: UpdateListingInput
): Promise<Listing> {
	const res = await http.put<Listing>(`/hotels/${id}`, data);
	return res.data;
}