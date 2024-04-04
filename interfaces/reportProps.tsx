export interface reportProps {
  team_member_id: string;
  room_id: string;
  date: Date;
  cleaned: boolean;
  comments: string;
  team_member: {
    member_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    total_points: number;
  };
  room: {
    room_id: string;
    room_number: string;
    building_number: number;
    is_clean: boolean;
    is_active: boolean;
    type_of_room: string;
  };
}
