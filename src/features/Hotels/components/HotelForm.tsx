
import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from "react-hook-form";

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
              <Controller
                key={amenity}
                name="amenities"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Array.isArray(field.value) ? field.value.includes(amenity) : false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          let newValue: string[] = Array.isArray(field.value) ? [...field.value] : [];
                          if (checked) {
                            if (!newValue.includes(amenity)) newValue.push(amenity);
                          } else {
                            newValue = newValue.filter((a) => a !== amenity);
                          }
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label={amenity}
                  />
                )}
              />
            ))}
          </Stack>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {Array.isArray(watch("amenities")) && watch("amenities").map((a: string) => (
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
