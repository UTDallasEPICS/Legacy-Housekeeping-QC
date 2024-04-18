import { Item } from "@prisma/client";

export interface InspectItemProps extends Item {
  key: number;
  is_deleted: boolean;
}

export function toInspectItemProps(item: Item, key): InspectItemProps {
  return {
    ...item,
    key: key,
    is_deleted: false,
  };
}
