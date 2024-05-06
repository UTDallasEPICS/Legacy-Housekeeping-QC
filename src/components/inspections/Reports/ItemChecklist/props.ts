import { Item } from "@prisma/client";

export interface ItemChecklistProps {
  rubric_id: number;
  room_id: number;
  disabled: boolean;
}

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

interface NewItemProps {
  key: number;
  name: string;
  category: string;
  room_id: number;
  rubric_id: number;
}

export function generateNewItem(newItem: NewItemProps): InspectItemProps {
  return {
    id: -1,
    key: newItem.key,
    name: newItem.name,
    category: newItem.category,
    weight: 1,
    is_checked: true,
    is_deleted: false,
    room_id: newItem.room_id,
    quantitative_id: newItem.rubric_id,
  };
}
