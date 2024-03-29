import { Clean_Status, Inspect_Status } from "@prisma/client";
import { Inspection, TeamMember } from "../types/db.interfaces";

export interface InspectionCardProps {
  id: number;
  room_id: number;
  rubric_id: number;
  inspect_status: Inspect_Status;
  clean_status: Clean_Status;
  room_name: string;
  building_name: string;
  floor_number: number;
  team_members: TeamMember[];
  score?: number;
  comment?: string;
  extra_score?: number;
}

export function toUncompletedInspectionCardProps(
  inspection: Inspection
): InspectionCardProps {
  return {
    id: inspection.id,
    room_id: inspection.schedule.room_id,
    rubric_id: inspection.rubric_id,
    inspect_status: inspection.inspect_status,
    clean_status: inspection.clean_status,
    room_name: inspection.schedule.room.name,
    building_name: inspection.schedule.building.name,
    floor_number: inspection.schedule.room.floor_number,
    team_members: inspection.schedule.team_members,
  };
}

export function toCompletedInspectionCardProps(
  inspection: Inspection
): InspectionCardProps {
  return {
    id: inspection.id,
    room_id: inspection.schedule.room_id,
    rubric_id: inspection.rubric_id,
    inspect_status: inspection.inspect_status,
    clean_status: inspection.clean_status,
    room_name: inspection.schedule.room.name,
    building_name: inspection.schedule.building.name,
    floor_number: inspection.schedule.room.floor_number,
    team_members: inspection.schedule.team_members,
    score: inspection.score.amount,
    comment: inspection.comment,
    extra_score: inspection.extra_score,
  };
}
