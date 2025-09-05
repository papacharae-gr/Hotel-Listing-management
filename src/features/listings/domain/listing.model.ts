export interface Listing {
id: string;
name: string;
description: string;
amenities: string[];
rating: number;
location: {
city: string;
country: string;
};
}