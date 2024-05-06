import { InspectItemProps } from "../ItemChecklist/props";

export interface CategoryCheckboxProps {
  items: InspectItemProps[];
  onCheck: any;
  onDelete: any;
  onAdd: any;
  disabled: boolean;
}
