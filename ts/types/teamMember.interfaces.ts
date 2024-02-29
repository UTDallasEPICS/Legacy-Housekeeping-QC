import { TeamMember } from "./db.interfaces";

export interface TeamMemberProperties {
  members: TeamMember[];
}

export interface TeamMemberProfile
  extends Omit<TeamMember, "id" | "person_id"> {}

export interface TeamMemberInfo extends Omit<TeamMember, "person_id"> {}
