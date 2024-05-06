import { CleanType } from "@prisma/client";

export interface CleanTypeRadioGroupProps {
  selected: CleanType;
  handleChange: (value: CleanType) => void;
}
