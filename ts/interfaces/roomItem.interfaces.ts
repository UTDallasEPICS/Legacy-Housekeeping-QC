import { Item } from "@prisma/client";

export interface InspectItemProps extends Item {
  is_deleted: boolean;
}

export function toInspectItemProps(item: Item): InspectItemProps {
  return {
    ...item,
    is_deleted: false,
  };
}
