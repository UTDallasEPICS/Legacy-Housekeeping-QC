export interface RoomOptionProps {
  room_id: number;
  room_name: string;
  floor_number: number;
  building_name: string;
}

export interface RoomDropdownSelectProps {
  options: RoomOptionProps[];
  selected: RoomOptionProps;
  handleChange: (value: RoomOptionProps) => void;
}
