import TextField from '@mui/material/TextField';
// ⬇️ type-only imports από RHF (δεν γίνονται runtime imports)
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  error?: FieldError;
  textarea?: boolean;
  // αυτό είναι το αποτέλεσμα του register("fieldName")
  register: UseFormRegisterReturn;
};

export default function TextInput({ label, name, error, textarea, register }: Props) {
  return (
    <TextField
      id={name}
      label={label}
      error={!!error}
      helperText={error?.message}
      multiline={!!textarea}
      {...register}
      fullWidth
      variant="outlined"
    />
  );
}
