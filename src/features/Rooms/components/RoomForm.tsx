
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roomFormSchema, roomTypes, type RoomFormValues } from '../feature/roomForm/validationSchema';

type RoomFormFieldsProps = {
  defaultValues: RoomFormValues;
  onSubmit: (values: RoomFormValues) => Promise<void> | void;
  loading?: boolean;
  submitLabel: string;
  onCancel: () => void;
};

export function RoomFormFields({ defaultValues, onSubmit, loading, submitLabel, onCancel }: RoomFormFieldsProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues,
  });
  const submitting = loading || isSubmitting;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Controller
          name="roomNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Room Number"
              placeholder="e.g. 101 or A2"
              error={!!errors.roomNumber}
              helperText={errors.roomNumber?.message}
              autoFocus
              fullWidth
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.type}>
              <FormLabel>Type</FormLabel>
              <Select {...field} label="Type">
                {roomTypes.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.type?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="pricePerNight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price per night"
              type="number"
              error={!!errors.pricePerNight}
              helperText={errors.pricePerNight?.message}
              fullWidth
            />
          )}
        />

        <FormControl component="fieldset" sx={{ display: 'flex', alignItems: 'center' }}>
          <FormLabel component="legend" sx={{ mb: 0 }}>Available</FormLabel>
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                color="primary"
              />
            )}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={6}>
        <Button variant="text" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" type="submit" disabled={submitting}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}
