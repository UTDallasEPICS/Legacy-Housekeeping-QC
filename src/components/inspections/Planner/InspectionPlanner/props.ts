import { BuildingWithRooms, BuildingsWithFloors } from "../../../../../ts/interfaces/room.interface";
import { TeamMember } from "../../../../../ts/types/db.interfaces";

export interface InspectionPlannerProps {
  members: TeamMember[];
  buildings: BuildingWithRooms[];
  floors: BuildingsWithFloors[];
}
