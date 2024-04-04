import { Box, Container, Divider, Typography } from "@mui/material";
import { BackButton, EditForm } from "../../src/components";
import { useSelector } from "react-redux";
import { selectMemberId } from "../../slices/memberProfileSlice";

const editMember = () => {
  const memberId = useSelector(selectMemberId);

  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: "#FAFAFA" }}>
        <Container>
          <BackButton pageToGoBack="/admin/teamMembers" />

          <Typography variant="h5">
            <b>Edit Team Member Profile</b>
          </Typography>
        </Container>
      </Box>

      <Divider />

      <Container>
        <Box sx={{ p: 2 }}>
          <EditForm memberId={memberId} />
        </Box>
      </Container>
    </Box>
  );
};

export default editMember;
