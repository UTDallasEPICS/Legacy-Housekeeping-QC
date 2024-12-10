export interface RoomOptionProps {
  room_id: number;
  room_name: string;
  floor_number: number;
  building_name: string;
}

//Selects a specific room based

export interface RoomDropdownSelectProps {
  options: RoomOptionProps[];
  selected: RoomOptionProps;
  handleChange: (value: RoomOptionProps) => void;
}

export interface BuildingOptionProps {
  floor_number: number;
  building_id: number;
  building_name: string;
}
//Filters the room down to a specific floor on a specific buildings
export interface BuildingDropdownSelectProps {
  options: BuildingOptionProps[];
  selected: BuildingOptionProps;
  handleChange: (value: BuildingOptionProps) => void;
}