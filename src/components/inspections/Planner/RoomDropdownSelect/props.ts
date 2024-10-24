//Returns the exact room that is selected by the user
export interface RoomOptionProps {
  room_id: number;
  room_name: string;
  floor_number: number;
  building_name: string;
}

//Helps narrow down where the room is
export interface BuildingOptionProps {
  floor_number: number;
  building_id: number;
  building_name: string;
}

//Props for the room dropdown select
export interface RoomDropdownSelectProps {
  options: RoomOptionProps[];
  selected: RoomOptionProps;
  handleChange: (value: RoomOptionProps) => void;
}

//Props for the building dropdown select
export interface BuildingDropdownSelectProps {
  options: BuildingOptionProps[];
  selected: BuildingOptionProps;
  handleChange: (value: BuildingOptionProps) => void;
}