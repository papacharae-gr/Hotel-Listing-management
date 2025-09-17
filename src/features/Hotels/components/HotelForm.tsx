import React from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    formState: { errors },
    watch,
  } = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Όνομα"
              error={!!errors.name}
              helperText={errors.name?.message}
              required
              fullWidth
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Περιγραφή"
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              multiline
              rows={3}
              fullWidth
            />
          )}
        />
        <FormControl component="fieldset" error={!!errors.amenities}>
          <FormLabel component="legend">Amenities</FormLabel>
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <FormGroup row>
                {['WiFi', 'Pool', 'Gym', 'Parking', 'Spa', 'Restaurant', 'Bar', 'Pet Friendly', 'Air Conditioning'].map((amenity) => (
                  <Checkbox
                    key={amenity}
                    checked={field.value?.includes(amenity) || false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, amenity]);
                      } else {
                        field.onChange(field.value.filter((a: string) => a !== amenity));
                      }
                    }}
                    value={amenity}
                    inputProps={{ 'aria-label': amenity }}
                  />
                  ))}
              </FormGroup>
            )}
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {watch("amenities")?.map((a: string) => (
              <Chip key={a} label={a} color="primary" />
            ))}
          </Box>
          {errors.amenities && (
            <span style={{ color: "red" }}>{errors.amenities.message as string}</span>
          )}
        </FormControl>
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
