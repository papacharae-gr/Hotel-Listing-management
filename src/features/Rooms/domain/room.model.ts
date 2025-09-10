export interface Room {
    id: string;
    hotelId: string;
    roomNumber: string;
    type: 'SINGLE' | 'DOUBLE' | 'SUITE' | 'FAMILY';
    pricePerNight: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;

    hotel?: { id: string; name: string };
}
export type RoomCreateInput = Omit<Room, 'id' | 'createdAt' | 'updatedAt' | 'hotel'>;

export type RoomUpdateInput = Partial<
  Pick<Room, 'roomNumber' | 'type' | 'pricePerNight' | 'isAvailable'>
>;
