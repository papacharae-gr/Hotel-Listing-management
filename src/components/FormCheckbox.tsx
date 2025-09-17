import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ReactNode } from "react";

type Props = {
  value: string;
  isChecked: boolean;
  onChange: () => void;
  children: ReactNode;
};

export default function FormCheckbox({ value, isChecked, onChange, children }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} onChange={onChange} value={value} />
      }
      label={children}
    />
  );
}
