import Box from "@mui/material/Box";
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
          height: "50rem",
          width: "25rem",
          overflowY: "auto",
          justifyContent: "left",
          position: "relative",
          marginTop: "2rem",
          marginLeft: "2rem",
        }}
      >
        {members.map((member) => (
          <MemberInfo
            key={member.member_id}
            firstName={member.first_name}
            lastName={member.last_name}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default scroll;
