import { z } from "zod";


export const listingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().max(500, "Max 500 characters"),
  amenities: z.array(z.string()),
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;
