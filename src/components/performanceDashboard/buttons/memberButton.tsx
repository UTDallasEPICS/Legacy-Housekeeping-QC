import { Box, ListItemButton, Divider, } from "@mui/material";

const MemberButton = ({ member, onClick }) => {
  return (
    <Box sx={{ width: 1 }}>
      <ListItemButton onClick={() => onClick(member)} 
        sx={{ width: 1 }}>
        {member.first_name} {member.last_name}
      </ListItemButton>
      <Divider />
    </Box>
  );
};

export default MemberButton;
