
import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement, CheckboxElement } from "react-hook-form-mui";

import type { HotelFormValues } from "../feature/updateHotel/validationSchema";
import { hotelFormSchema } from "../feature/updateHotel/validationSchema";

interface HotelFormProps {
  defaultValues: HotelFormValues;
  onSubmit: (values: HotelFormValues) => void;
  isLoading?: boolean;
  submitText?: string;
}


export const HotelForm: React.FC<HotelFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitText = "Αποθήκευση",
}) => {
  const {
    handleSubmit,
    control,
    watch,
  } = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues,
  });

  const AMENITIES = ['WiFi', 'Pool', 'Gym', 'Parking', 'Spa', 'Restaurant', 'Bar', 'Pet Friendly', 'Air Conditioning'];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextFieldElement
          name="name"
          control={control}
          label="Όνομα"
          required
          fullWidth
        />
        <TextFieldElement
          name="description"
          control={control}
          label="Περιγραφή"
          required
          multiline
          rows={3}
          fullWidth
        />
        <Box>
          <Box sx={{ mb: 1, fontWeight: 500 }}>Amenities</Box>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {AMENITIES.map((amenity) => (
              <CheckboxElement
                key={amenity}
                name="amenities"
                label={amenity}
                value={amenity}
                control={control}
              />
            ))}
          </Stack>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {watch("amenities")?.map((a: string) => (
              <Chip key={a} label={a} color="primary" />
            ))}
          </Box>
        </Box>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          {submitText}
        </Button>
      </Stack>
    </form>
  );
};

export default HotelForm;
