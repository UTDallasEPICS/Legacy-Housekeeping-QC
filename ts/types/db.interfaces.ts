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
} from "@prisma/client";
export type TeamMember = Omit<TeamMemberDB & PersonDB, "type" | "person_id">;
export type User = Omit<UserDB & PersonDB, "type" | "person_id">;

export type CommonArea = Omit<CommonAreaDB & RoomDB, "type">;
export type PersonalRoom = Omit<PersonalRoomDB & RoomDB, "type">;

export type HollisticRubric = Omit<HollisticRubricDB & RubricDB, "type">;
export type QuantitativeRubric = Omit<QuantitativeRubricDB & RubricDB, "type">;

const personIncludeTeamMember = Prisma.validator<Prisma.PersonArgs>()({
  include: { teamMember: true },
});
type PersonIncludeTeamMember = Prisma.PersonGetPayload<
  typeof personIncludeTeamMember
>;
const teamMemberIncludePerson = Prisma.validator<Prisma.TeamMemberArgs>()({
  include: { person: true },
});
type TeamMemberIncludePerson = Prisma.TeamMemberGetPayload<
  typeof teamMemberIncludePerson
>;
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

const personIncludeUser = Prisma.validator<Prisma.PersonArgs>()({
  include: { user: true },
});
type PersonIncludeUser = Prisma.PersonGetPayload<typeof personIncludeUser>;
const userIncludePerson = Prisma.validator<Prisma.UserArgs>()({
  include: { person: true },
});
type UserIncludePerson = Prisma.UserGetPayload<typeof userIncludePerson>;
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

/* Need to reverse the direction of the type

const commonAreaRoom = Prisma.validator<Prisma.CommonAreaArgs>()({
  include: { room: true },
});
type CommonAreaRoom = Prisma.CommonAreaGetPayload<typeof commonAreaRoom>;
export function toCommonArea(a: CommonAreaRoom): CommonArea {
  return {
    id: a.id,
    name: a.room.name,
    room_id: a.room_id,
    floor_id: a.room.floor_id,
  };
}

const personalRoomRoom = Prisma.validator<Prisma.PersonalRoomArgs>()({
  include: { room: true },
});
type PersonalRoomRoom = Prisma.PersonalRoomGetPayload<typeof personalRoomRoom>;
export function toPersonalRoom(a: PersonalRoomRoom): PersonalRoom {
  return {
    id: a.id,
    name: a.room.name,
    is_occupied: a.is_occupied,
    room_id: a.room_id,
    floor_id: a.room.floor_id,
  };
}

const hollisticRubricRubric = Prisma.validator<Prisma.HollisticRubricArgs>()({
  include: { rubric: true },
});
type HollisticRubricRubric = Prisma.HollisticRubricGetPayload<
  typeof hollisticRubricRubric
>;
export function toHollisticRubric(a: HollisticRubricRubric): HollisticRubric {
  return {
    id: a.id,
    rubric_id: a.rubric_id,
  };
}

const quantitativeRubricRubric =
  Prisma.validator<Prisma.QuantitativeRubricArgs>()({
    include: { rubric: true },
  });
type QuantitativeRubricRubric = Prisma.QuantitativeRubricGetPayload<
  typeof quantitativeRubricRubric
>;
export function toQuantitativeRubric(
  a: QuantitativeRubricRubric
): QuantitativeRubric {
  return {
    id: a.id,
    rubric_id: a.rubric_id,
  };
}

*/
