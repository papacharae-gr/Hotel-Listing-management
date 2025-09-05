import axios from 'axios';


export const http = axios.create({
    baseURL: 'http://localhost:3001/api/hotels',
    headers: { 'Content-Type': 'application/json' },
});


export async function getHotels() {
    const response = await http.get('/');
    return response.data;
}

export async function getHotelById(id: string) {
    const response = await http.get(`/${id}`);
    return response.data;
}

export async function updateHotel(id: string, data: Hotel) {
    const response = await http.put(`/${id}`, data);
    return response.data;
}

// Define the Hotel type

export async function deleteHotel(id: string) {
    const response = await http.delete(`/${id}`);
    return response.data;
}


export interface Hotel {
    id?: string;
    name: string;
    address: string;
   
    // Add other hotel properties as needed
}