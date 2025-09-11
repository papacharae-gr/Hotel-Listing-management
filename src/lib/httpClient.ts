
import axios from 'axios';

// Base URLs for API endpoints
export const API_BASE_HOTELS = 'http://localhost:3001/api/hotels';
export const API_BASE_ROOMS = 'http://localhost:3001/api/rooms';

export const httpClient = axios.create();


export interface Hotel {
    id?: string;
    name: string;
    description: string;
}