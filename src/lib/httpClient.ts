import axios from 'axios';


// Generic Axios instance — θα το χρησιμοποιήσουμε αργότερα όταν συνδέσουμε πραγματικό API
export const http = axios.create({
baseURL: '/api',
headers: { 'Content-Type': 'application/json' },
});