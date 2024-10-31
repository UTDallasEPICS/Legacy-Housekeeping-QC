import { Box, Container, Divider, Typography } from "@mui/material";
import { BackButton, EditForm, Navbar } from "../../src/components";
import { useSelector } from "react-redux";
import { selectMemberId } from "../../slices/memberProfileSlice";
import Banner from "../../src/components/adminDashboard/Banner/Banner";

const goBackLink = "/admin/teamMembers";

const editMember = () => {
  const memberId = useSelector(selectMemberId);

  return (
    <Box>
      <Navbar />
      <Banner relativePath={goBackLink} function={"Edit Team Member"} />

      <Container>
        <Box sx={{ p: 2 }}>
          <EditForm memberId={memberId} />
        </Box>
      </Container>
    </Box>
  );
};

export default editMember;
