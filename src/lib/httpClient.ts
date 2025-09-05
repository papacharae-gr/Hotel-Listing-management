import axios from 'axios';


// Generic Axios instance — θα το χρησιμοποιήσουμε αργότερα όταν συνδέσουμε πραγματικό API
export const http = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});