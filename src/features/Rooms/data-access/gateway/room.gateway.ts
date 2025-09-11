/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Room, RoomCreateInput, RoomUpdateInput } from '../../domain/room.model';
import { httpClient, API_BASE_ROOMS } from '../../../../lib/httpClient';
import type { AxiosError } from 'axios';


// Helper function to throw a formatted API error based on status code
function throwApiError(err: unknown): never {
    const e = err as AxiosError<any>;
    const status = e?.response?.status;
    let message = 'Unexpected error';

    switch (status) {
        case 400:
            message = 'Validation error. Please check the fields.';
            break;
        case 404:
            message = 'Resource not found.';
            break;
        case 409:
            message = 'Conflict: room number already exists for this hotel.';
            break;
        case 500:
            message = 'Server error. Please try again.';
            break;
        default:
            message = e?.message || message;
    }

    const error = new Error(message) as Error & { status?: number; details?: unknown };
    error.status = status;
    error.details = e?.response?.data;
    throw error;
}

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
