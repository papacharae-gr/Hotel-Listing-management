import { Checkbox } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  value: string;
  isChecked: boolean;
  onChange: () => void;
  children: ReactNode;
};

export default function FormCheckbox({ value, isChecked, onChange, children }: Props) {
  return (
    <Checkbox value={value} isChecked={isChecked} onChange={onChange}>
      {children}
    </Checkbox>
  );
}
