import { InspectItemProps } from "../ItemChecklist/props";

export interface CategoryHeaderProps {
  items: InspectItemProps[];
  category: string;
  onCheck: any;
  disabled: boolean;
}
