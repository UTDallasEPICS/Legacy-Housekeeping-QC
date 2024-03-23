import { Clean_Status, Inspect_Status } from "@prisma/client";
import { Inspection, TeamMember } from "../types/db.interfaces";

export interface CompletedInspectionCardProps {
  id: number;
  inspect_status: Inspect_Status;
  clean_status: Clean_Status;
  room_name: string;
  building_name: string;
  floor_number: number;
  team_members: TeamMember[];
}

export function toCompletedInspectionCardProps(
  inspection: Inspection
): CompletedInspectionCardProps {
  return {
    id: inspection.id,
    inspect_status: inspection.inspect_status,
    clean_status: inspection.clean_status,
    room_name: inspection.schedule.room.name,
    building_name: inspection.schedule.building.name,
    floor_number: inspection.schedule.room.floor_number,
    team_members: inspection.schedule.team_members,
  };
}
