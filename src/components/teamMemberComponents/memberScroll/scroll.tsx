import { Box, List, Typography } from "@mui/material";
import { MemberInfo } from "../..";
import { MembersProperties } from "../../../../interfaces/membersObject";

const scroll = ({ members }: MembersProperties) => {
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
              key={member.member_id}
              firstName={member.first_name}
              lastName={member.last_name}
              email={member.email}
              countryCode={member.country_code}
              stateCode={member.state_code}
              phoneNumber={member.phone_number}
              addressLine={member.address_line}
              city={member.city}
              state={member.state}
              zipcode={member.zipcode}
              memberId={member.member_id}
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
