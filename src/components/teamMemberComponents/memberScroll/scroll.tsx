import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { MemberInfo } from "../..";

const scroll = ({ members }) => {
  return (
    <Box
      sx={{
        width: "25rem",
        position: "relative",
        justifyContent: "left",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: "43rem",
          width: "25rem",
          overflowY: "auto",
          justifyContent: "left",
          position: "relative",
          marginTop: "2rem",
          marginLeft: "2rem",
        }}
      >
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
          <Typography variant="h6" component="h4">
            EMPTY
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default scroll;
