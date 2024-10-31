import { Box, Container, Divider, Typography } from "@mui/material";
import { BackButton, FormAddMember, Navbar } from "../../src/components";
import navbar from "../../src/components/adminDashboard/navbar/navbar";
import Banner from "../../src/components/adminDashboard/Banner/Banner";

const goBackLink = "/admin/teamMembers";

const addMember = () => {
  return (
    <Box>
      <Navbar />
      <Banner relativePath={goBackLink} function={"Add Team Member"} />

      <Box>
        <Box sx={{ p: 2 }}>
          <FormAddMember />
        </Box>
      </Box>
    </Box>
  );
};

export default addMember;
