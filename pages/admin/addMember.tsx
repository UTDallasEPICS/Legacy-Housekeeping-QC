import { Box, Container, Divider, Typography } from "@mui/material";
import { BackButton, FormAddMember } from "../../src/components";

const addMember = () => {
  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: "#FAFAFA" }}>
        <Container>
          <BackButton pageToGoBack="/admin/teamMembers" />

          <Typography variant="h5">
            <b>Add Team Member</b>
          </Typography>
        </Container>
      </Box>

      <Divider />

      <Container>
        <Box sx={{ p: 2 }}>
          <FormAddMember />
        </Box>
      </Container>
    </Box>
  );
};

export default addMember;
