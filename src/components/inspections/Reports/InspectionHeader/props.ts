import { TeamMember } from "../../../../../ts/types/db.interfaces";

export interface InspectionHeaderProps {
  room_name: string;
  floor_number: number;
  building_name: string;
  team_members: TeamMember[];
  inspected: boolean;
}
