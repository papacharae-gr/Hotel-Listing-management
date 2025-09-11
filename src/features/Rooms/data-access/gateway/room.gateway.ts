import type { Room, RoomCreateInput, RoomUpdateInput } from '../../domain/room.model';
import { httpClient, API_BASE_ROOMS } from '../../../../lib/httpClient';
import { throwApiError } from '../../../../lib/errorHandler';



// Fetch all rooms for a specific hotel
export async function getRoomsByHotel(hotelId: string): Promise<Room[]> {
  try {
    const res = await httpClient.get<{ data: Room[] }>(`${API_BASE_ROOMS}`, {
      params: { hotelId },
    });
    return res.data?.data ?? [];
  } catch (err) {
    throwApiError(err);
  }
}


// Fetch a single room by its ID
export async function getRoom(roomId: string): Promise<Room> {
    try {
        const res = await httpClient.get<{ data: Room }>(`${API_BASE_ROOMS}/${roomId}`);
        return res.data.data;
    } catch (err) {
        throwApiError(err);
    }
}

// Create a new room for a specific hotel
export async function createRoom(hotelId: string, data: RoomCreateInput): Promise<Room> {
  try {
    // ΣΤΕΛΝΟΥΜΕ hotelId στο body, αφού δεν υπάρχει nested route
    const res = await httpClient.post<{ data: Room }>(`${API_BASE_ROOMS}`, {
      ...data,
      hotelId,
    });
    return res.data.data;
  } catch (err) {
    throwApiError(err);
  }
}


// Update an existing room by its ID
export async function updateRoom(roomId: string, data: RoomUpdateInput): Promise<Room> {
    try {
        const res = await httpClient.put<{ data: Room }>(`${API_BASE_ROOMS}/${roomId}`, data);
        return res.data.data;
    } catch (err) {
        throwApiError(err);
    }
}

// Delete a room by its ID
export async function deleteRoom(roomId: string): Promise<void> {
    try {
        await httpClient.delete(`${API_BASE_ROOMS}/${roomId}`);
    } catch (err) {
        throwApiError(err);
    }
}
