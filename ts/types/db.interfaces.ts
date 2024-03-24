import {
  Prisma,
  User as UserDB,
  TeamMember as TeamMemberDB,
  Person as PersonDB,
  Room as RoomDB,
  CommonArea as CommonAreaDB,
  PersonalRoom as PersonalRoomDB,
  Rubric as RubricDB,
  HollisticRubric as HollisticRubricDB,
  QuantitativeRubric as QuantitativeRubricDB,
  Inspection as InspectionDB,
  Schedule as ScheduleDB,
  Building as BuildingDB,
  RubricType,
} from "@prisma/client";
import { BuildingWithRooms } from "../interfaces/room.interface";
export type TeamMember = Omit<TeamMemberDB & PersonDB, "type" | "person_id">;
export type User = Omit<UserDB & PersonDB, "type" | "person_id">;

export type CommonArea = Omit<CommonAreaDB & RoomDB, "type" | "room_id">;
export type PersonalRoom = Omit<PersonalRoomDB & RoomDB, "type" | "room_id">;

export type HollisticRubric = {
  requirements: Requirement[];
} & Omit<HollisticRubricDB & RubricDB, "type" | "rubric_id">;
export type QuantitativeRubric = {
  items: Item[];
} & Omit<QuantitativeRubricDB & RubricDB, "type" | "rubric_id">;

export type Requirement = {
  id: number;
  description: string;
};

export type Item = {
  item_name: string;
};

export type Inspection = {
  schedule: Schedule;
  rubric: Rubric;
  inspector: User;
} & InspectionDB;

export type Schedule = {
  room: Room;
  building: Building;
  team_members: TeamMember[];
} & ScheduleDB;

export type Rubric = HollisticRubric | QuantitativeRubric;
export type Room = CommonArea | PersonalRoom;
export type Building = BuildingDB;

export const buildingIncludeRooms = Prisma.validator<Prisma.BuildingInclude>()({
  rooms: true,
});
type BuildingIncludeRooms = Prisma.BuildingGetPayload<{
  include: typeof buildingIncludeRooms;
}>;

export function toBuildingWithRooms(
  a: BuildingIncludeRooms
): BuildingWithRooms {
  return {
    id: a.id,
    name: a.name,
    rooms: a.rooms,
  };
}

export const inspectionIncludeAll =
  Prisma.validator<Prisma.InspectionInclude>()({
    rubric: {
      include: {
        hollistic_rubric: {
          include: { requirements: true },
        },
        quantitative_rubric: {
          include: { items: true },
        },
      },
    },
    schedule: {
      include: {
        room: {
          include: { building: true, common_area: true, personal_room: true },
        },
        team_members: { include: { person: true } },
      },
    },
    inspector: {
      include: { person: true },
    },
  });
type InspectionIncludeAll = Prisma.InspectionGetPayload<{
  include: typeof inspectionIncludeAll;
}>;
export function toInspection(a: InspectionIncludeAll): Inspection {
  let rubric;
  switch (a.rubric.type) {
    case RubricType.HOLLISTIC:
      rubric = toHollisticRubric(a.rubric);
    case RubricType.QUANTITATIVE:
      rubric = toQuantitativeRubric(a.rubric);
  }
  return {
    id: a.id,
    inspect_status: a.inspect_status,
    clean_status: a.clean_status,
    schedule: toSchedule(a.schedule),
    rubric: rubric,
    inspector: fromUser(a.inspector),
    timestamp: a.timestamp,
    room_pics: a.room_pics,
    inspector_id: a.inspector_id,
    schedule_id: a.schedule_id,
    rubric_id: a.rubric_id,
    comment: a.comment,
    score: a.score,
  };
}

export const scheduleIncludeAll = Prisma.validator<Prisma.ScheduleInclude>()({
  room: {
    include: { building: true, common_area: true, personal_room: true },
  },
  team_members: {
    include: { person: true },
  },
});
type ScheduleIncludeAll = Prisma.ScheduleGetPayload<{
  include: typeof scheduleIncludeAll;
}>;
export function toSchedule(a: ScheduleIncludeAll): Schedule {
  const room = a.room.common_area
    ? toCommonArea(a.room)
    : toPersonalRoom(a.room);
  return {
    id: a.id,
    room_id: a.room_id,
    room: room,
    start_time: a.start_time,
    end_time: a.end_time,
    clean_type: a.clean_type,
    building: a.room.building,
    team_members: a.team_members.map((member) => {
      return fromTeamMember(member);
    }),
  };
}

export const personIncludeTeamMember = Prisma.validator<Prisma.PersonInclude>()(
  { teamMember: true }
);
type PersonIncludeTeamMember = Prisma.PersonGetPayload<{
  include: typeof personIncludeTeamMember;
}>;
export const teamMemberIncludePerson =
  Prisma.validator<Prisma.TeamMemberInclude>()({
    person: true,
  });
type TeamMemberIncludePerson = Prisma.TeamMemberGetPayload<{
  include: typeof teamMemberIncludePerson;
}>;
export function toTeamMember(a: PersonIncludeTeamMember): TeamMember {
  return {
    id: a.id,
    first_name: a.first_name,
    last_name: a.last_name,
    email: a.teamMember.email,
    country_code: a.country_code,
    state_code: a.state_code,
    phone_number: a.phone_number,
  };
}
export function fromTeamMember(a: TeamMemberIncludePerson): TeamMember {
  return {
    id: a.person.id,
    first_name: a.person.first_name,
    last_name: a.person.last_name,
    email: a.email,
    country_code: a.person.country_code,
    state_code: a.person.state_code,
    phone_number: a.person.phone_number,
  };
}

export const personIncludeUser = Prisma.validator<Prisma.PersonInclude>()({
  user: true,
});
type PersonIncludeUser = Prisma.PersonGetPayload<{
  include: typeof personIncludeUser;
}>;
export const userIncludePerson = Prisma.validator<Prisma.UserInclude>()({
  person: true,
});
type UserIncludePerson = Prisma.UserGetPayload<{
  include: typeof userIncludePerson;
}>;
export function toUser(a: PersonIncludeUser): User {
  return {
    id: a.id,
    first_name: a.first_name,
    last_name: a.last_name,
    email: a.user.email,
    password: a.user.password,
    country_code: a.country_code,
    state_code: a.state_code,
    phone_number: a.phone_number,
  };
}
export function fromUser(a: UserIncludePerson): User {
  return {
    id: a.person.id,
    first_name: a.person.first_name,
    last_name: a.person.last_name,
    email: a.email,
    password: a.password,
    country_code: a.person.country_code,
    state_code: a.person.state_code,
    phone_number: a.person.phone_number,
  };
}

export const roomIncludeCommonArea = Prisma.validator<Prisma.RoomInclude>()({
  common_area: true,
});
type RoomIncludeCommonArea = Prisma.RoomGetPayload<{
  include: typeof roomIncludeCommonArea;
}>;
export const commonAreaIncludeRoom =
  Prisma.validator<Prisma.CommonAreaInclude>()({
    room: true,
  });
type CommonAreaIncludeRoom = Prisma.CommonAreaGetPayload<{
  include: typeof commonAreaIncludeRoom;
}>;
export function toCommonArea(a: RoomIncludeCommonArea): CommonArea {
  return {
    id: a.id,
    name: a.name,
    floor_number: a.floor_number,
    building_id: a.building_id,
    rubric_id: a.rubric_id,
  };
}
export function fromCommonArea(a: CommonAreaIncludeRoom): CommonArea {
  return {
    id: a.room.id,
    name: a.room.name,
    floor_number: a.room.floor_number,
    building_id: a.room.building_id,
    rubric_id: a.room.rubric_id,
  };
}

export const roomIncludePersonalRoom = Prisma.validator<Prisma.RoomInclude>()({
  personal_room: true,
});
type RoomIncludePersonalRoom = Prisma.RoomGetPayload<{
  include: typeof roomIncludePersonalRoom;
}>;
export const personalRoomIncludeRoom =
  Prisma.validator<Prisma.PersonalRoomInclude>()({
    room: true,
  });
type PersonalRoomIncludeRoom = Prisma.PersonalRoomGetPayload<{
  include: typeof personalRoomIncludeRoom;
}>;
export function toPersonalRoom(a: RoomIncludePersonalRoom): PersonalRoom {
  return {
    id: a.id,
    name: a.name,
    floor_number: a.floor_number,
    building_id: a.building_id,
    is_occupied: a.personal_room.is_occupied,
    rubric_id: a.rubric_id,
  };
}
export function fromPersonalRoom(a: PersonalRoomIncludeRoom): PersonalRoom {
  return {
    id: a.room.id,
    name: a.room.name,
    floor_number: a.room.floor_number,
    building_id: a.room.building_id,
    is_occupied: a.is_occupied,
    rubric_id: a.room.rubric_id,
  };
}

export const rubricIncludeHollisticRubric =
  Prisma.validator<Prisma.RubricInclude>()({
    hollistic_rubric: { include: { requirements: true } },
  });
type RubricIncludeHollisticRubric = Prisma.RubricGetPayload<{
  include: typeof rubricIncludeHollisticRubric;
}>;
export const hollisticRubricIncludeRubric =
  Prisma.validator<Prisma.HollisticRubricInclude>()({
    rubric: true,
    requirements: true,
  });
type HollisticRubricIncludeRubric = Prisma.HollisticRubricGetPayload<{
  include: typeof hollisticRubricIncludeRubric;
}>;
export function toHollisticRubric(
  a: RubricIncludeHollisticRubric
): HollisticRubric {
  return {
    id: a.id,
    requirements: a.hollistic_rubric.requirements,
  };
}
export function fromHollisticRubric(
  a: HollisticRubricIncludeRubric
): HollisticRubric {
  return {
    id: a.rubric.id,
    requirements: a.requirements,
  };
}

const rubricIncludeQuantitativeRubric =
  Prisma.validator<Prisma.RubricInclude>()({
    quantitative_rubric: { include: { items: true } },
  });
type RubricIncludeQuantitativeRubric = Prisma.RubricGetPayload<{
  include: typeof rubricIncludeQuantitativeRubric;
}>;
const quantitativeRubricIncludeRubric =
  Prisma.validator<Prisma.QuantitativeRubricInclude>()({
    rubric: true,
    items: true,
  });
type QuantitativeRubricIncludeRubric = Prisma.QuantitativeRubricGetPayload<{
  include: typeof quantitativeRubricIncludeRubric;
}>;
export function toQuantitativeRubric(
  a: RubricIncludeQuantitativeRubric
): QuantitativeRubric {
  return {
    id: a.id,
    items: a.quantitative_rubric.items,
  };
}
export function fromQuantitativeRubric(
  a: QuantitativeRubricIncludeRubric
): QuantitativeRubric {
  return {
    id: a.rubric.id,
    items: a.items,
  };
}
