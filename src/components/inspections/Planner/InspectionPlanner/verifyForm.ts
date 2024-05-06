import { CleanType } from "@prisma/client";
import { RoomOptionProps } from "../RoomDropdownSelect/props";
import { TeamMemberOptionProps } from "../TeamMemberMultiSelect/props";

export interface InspectionPlannerFormProps {
  selectedMembers: TeamMemberOptionProps[];
  selectedRoom: RoomOptionProps;
  selectedCleanType: CleanType;
}

export interface VerificationResult {
  isValid: boolean;
  messages: string[];
}

export function verifyForm(
  form: InspectionPlannerFormProps
): VerificationResult {
  let isValid = true;
  let messages: string[] = [];

  if (form.selectedMembers.length === 0) {
    isValid = false;
    messages.push("Please select at least one team member.");
  }

  if (!form.selectedRoom) {
    isValid = false;
    messages.push("Please select a room.");
  }

  return { isValid, messages };
}
