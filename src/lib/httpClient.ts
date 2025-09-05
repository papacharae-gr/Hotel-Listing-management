import axios from 'axios';


// Generic Axios instance — θα το χρησιμοποιήσουμε αργότερα όταν συνδέσουμε πραγματικό API
export const http = axios.create({
    baseURL: 'http://localhost:3001/api/hotels',
    headers: { 'Content-Type': 'application/json' },
});

// Example function to get the response from the endpoint
export async function getHotels() {
    const response = await http.get('/');
    return response.data;
}