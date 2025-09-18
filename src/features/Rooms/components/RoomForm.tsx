
import { FormContainer, TextFieldElement, SelectElement, SwitchElement } from 'react-hook-form-mui';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { roomFormSchema, roomTypes, type RoomFormValues } from '../feature/roomForm/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type RoomFormFieldsProps = {
  defaultValues: RoomFormValues;
  onSubmit: (values: RoomFormValues) => Promise<void> | void;
  loading?: boolean;
  submitLabel: string;
  onCancel: () => void;
};

export function RoomFormFields({ defaultValues, onSubmit, submitLabel, onCancel }: RoomFormFieldsProps) {
  return (
    <FormContainer
      defaultValues={defaultValues}
      resolver={zodResolver(roomFormSchema)}
      onSuccess={onSubmit}
    >
      <Stack gap={4} margin={2}>
        <TextFieldElement
          name="roomNumber"
          label="Room Number"
          placeholder="e.g. 101 or A2"
          autoFocus
          fullWidth
        />
        <SelectElement
          name="type"
          label="Type"
          options={roomTypes.map((t) => ({ id: t, label: t }))}
          fullWidth
        />
        <TextFieldElement
          name="pricePerNight"
          label="Price per night"
          type="number"
          fullWidth
        />
        <SwitchElement
          name="isAvailable"
          label="Available"
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={6}>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" type="submit">
          {submitLabel}
        </Button>
      </Stack>
    </FormContainer>
  );
}
