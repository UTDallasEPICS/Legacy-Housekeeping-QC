import { InspectionFilterBy } from "../ts/const/inspection.constant";
import { Inspection } from "../ts/types/db.interfaces";

export const filterInspection = (
  inspections: Inspection[],
  filter: string,
  filterBy: InspectionFilterBy
) => {
  filter = filter.toLowerCase();
  if (filter === "") return inspections;
  if (filterBy == InspectionFilterBy.ROOM_NAME) {
    return inspections.filter((value) =>
      value.schedule.room.name.toLowerCase().includes(filter)
    );
  }
  if (filterBy == InspectionFilterBy.FLOOR_NUMBER) {
    return inspections.filter((value) =>
      value.schedule.room.floor_number.toString().includes(filter)
    );
  }
  if (filterBy == InspectionFilterBy.BUILDING_NAME) {
    return inspections.filter((value) =>
      value.schedule.building.name.toLowerCase().includes(filter)
    );
  }
  if (filterBy == InspectionFilterBy.MEMBER_NAME) {
    return inspections.filter(
      (value) =>
        value.schedule.team_members.filter(
          (member) =>
            member.first_name.toLowerCase().includes(filter) ||
            member.last_name.toLowerCase().includes(filter)
        ).length > 0
    );
  }
};
