import { BuildingWithRooms } from "../../../../../ts/interfaces/room.interface";
import { TeamMember } from "../../../../../ts/types/db.interfaces";
import { BuildingHolder } from "../../../../../ts/interfaces/building.interfaces";

export interface InspectionPlannerProps {
  members: TeamMember[];
  buildingsWithRooms: BuildingWithRooms[];
  buildings: BuildingHolder[];
}
