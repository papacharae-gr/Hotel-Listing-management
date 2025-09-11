
import {
  FormControl, FormLabel, Input, Select, Switch, FormErrorMessage, Stack, Button
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues,
  });
  const submitting = loading || isSubmitting;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <FormControl isInvalid={!!errors.roomNumber}>
          <FormLabel>Room Number</FormLabel>
          <Input
            placeholder="e.g. 101 or A2"
            {...register('roomNumber')}
            autoFocus
          />
          <FormErrorMessage>{errors.roomNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.type}>
          <FormLabel>Type</FormLabel>
          <Select {...register('type')}>
            {roomTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.pricePerNight}>
          <FormLabel>Price per night</FormLabel>
          <Input
            type="number"
            {...register('pricePerNight', { valueAsNumber: true })}
          />
          <FormErrorMessage>{errors.pricePerNight?.message}</FormErrorMessage>
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Available</FormLabel>
          <Switch {...register('isAvailable')} isChecked={watch('isAvailable')} />
        </FormControl>
      </Stack>
      <Stack direction="row" justify="flex-end" mt={6}>
        <Button variant="ghost" onClick={onCancel} isDisabled={submitting}>
          Cancel
        </Button>
        <Button colorScheme="blue" type="submit" isLoading={submitting}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}
