import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
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
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {textarea ? (
        <Textarea id={name} {...register} />
      ) : (
        <Input id={name} {...register} />
      )}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
