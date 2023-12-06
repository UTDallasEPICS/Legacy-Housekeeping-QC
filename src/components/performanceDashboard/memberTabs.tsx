import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { memberData } from "../../../pages/members_performance";

interface MemberTabsProps {
  onMemberClick: (member: string) => void;
}

const MemberTabs = ({ onMemberClick }: MemberTabsProps) => {
  const [selectedMember, setSelectedMember] = useState("member1");

  const handleMemberChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedMember(newValue);
    onMemberClick(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={selectedMember}
        onChange={handleMemberChange}
        variant="fullWidth"
        aria-label="member tabs"
        centered
        textColor="primary"
      >
        {Object.keys(memberData)
          .slice(0, 4)
          .map((member) => (
            <Tab
              key={member}
              label={member}
              value={member}
              onClick={() => onMemberClick(member)}
            />
          ))}
      </Tabs>
    </Box>
  );
};

export default MemberTabs;