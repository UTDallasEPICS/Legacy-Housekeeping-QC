import { Box, List, Typography } from "@mui/material";
import { MemberInfo } from "../..";
import { TeamMemberProperties } from "../../../../ts/types/teamMember.interfaces";

const scroll = ({ members }: TeamMemberProperties) => {
  return (
    <Box
      sx={{
        width: { sm: "12.5rem", md: "25rem" },
        flex: 1,
        overflowY: "auto",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <List>
        {members.length > 0 ? (
          members.map((member) => (
            <MemberInfo
              key={member.id}
              first_name={member.first_name}
              last_name={member.last_name}
              email={member.email}
              country_code={member.country_code}
              state_code={member.state_code}
              phone_number={member.phone_number}
              id={member.id}
            />
          ))
        ) : (
          <Typography variant="h5" sx={{ p: 2 }}>
            Empty list
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default scroll;
