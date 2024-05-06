export interface TeamMemberOptionProps {
  id: number;
  name: string;
}

export interface TeamMemberMultiSelectProps {
  options: TeamMemberOptionProps[];
  selected: TeamMemberOptionProps[];
  handleChange: (value: TeamMemberOptionProps[]) => void;
}
