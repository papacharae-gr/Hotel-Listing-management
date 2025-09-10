// src/features/Rooms/feature/roomForm/validationSchema.ts
import { z } from 'zod';

export const roomFormSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required'),
  type: z.enum(['SINGLE', 'DOUBLE', 'SUITE', 'FAMILY']),
  pricePerNight: z.number().min(1, 'Price per night must be at least 1'),
  isAvailable: z.boolean(),
});

export type RoomFormValues = z.infer<typeof roomFormSchema>;

export const roomTypes = ['SINGLE', 'DOUBLE', 'SUITE', 'FAMILY'] as const;
