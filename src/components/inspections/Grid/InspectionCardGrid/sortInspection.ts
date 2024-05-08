import { Inspection } from "../../../../../ts/types/db.interfaces";
export enum InspectionSortBy {
  ROOM_NAME = "Room Name",
  FLOOR_NUMBER = "Floor Number",
  BUILDING_NAME = "Building Name",
  MEMBER_NAME = "Member Name",
}

export const sortInspection = (
  inspections: Inspection[],
  sortBy: InspectionSortBy
) => {
  if (inspections.length === 0) return inspections;
  if (sortBy == InspectionSortBy.ROOM_NAME) {
    return inspections.toSorted((a, b) =>
      a.schedule.room.name.localeCompare(b.schedule.room.name)
    );
  }
  if (sortBy == InspectionSortBy.FLOOR_NUMBER) {
    return inspections.toSorted(
      (a, b) => a.schedule.room.floor_number - b.schedule.room.floor_number
    );
  }
  if (sortBy == InspectionSortBy.BUILDING_NAME) {
    return inspections.toSorted((a, b) =>
      a.schedule.building.name.localeCompare(b.schedule.building.name)
    );
  }
  if (sortBy == InspectionSortBy.MEMBER_NAME) {
    return inspections.toSorted((a, b) => {
      const aName = a.schedule.team_members
        .map((member) => member.first_name + member.last_name)
        .join("");
      const bName = b.schedule.team_members
        .map((member) => member.first_name + member.last_name)
        .join("");
      return aName.localeCompare(bName);
    });
  }
};
