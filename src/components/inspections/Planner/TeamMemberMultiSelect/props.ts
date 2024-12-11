export interface TeamMemberOptionProps {
  id: string;
  name: string;
}

export interface TeamMemberMultiSelectProps {
  options: TeamMemberOptionProps[];
  selected: TeamMemberOptionProps[];
  handleChange: (value: TeamMemberOptionProps[]) => void;
}
