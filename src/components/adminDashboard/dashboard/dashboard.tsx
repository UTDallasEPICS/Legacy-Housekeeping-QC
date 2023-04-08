import { Box, Container, Typography } from "@mui/material";

import { PerformanceInsightsCard, TodaysInspectionsCard } from "../..";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const dashboard = () => {
  // GET FIRST NAME TO DISPLAY ****************************
  const { data: session } = useSession();
  const [signedInUser, setSignedInUser] = useState("User");

  useEffect(() => {
    setSignedInUser(session?.user?.first_name);

    // For debugging only:
    // console.log(signedInUser);
  }, [session?.user?.first_name]);
  // ******************************************************

  return (
    <Container sx={{ textAlign: "center", height: 1 }}>
      <Box sx={{ p: { xs: 4, sm: 8, md: 12 } }}>
        <Typography variant="h2">
          Hello,<b> {signedInUser}.</b>
        </Typography>
      </Box>

      <Box
        sx={{
          display: { md: "flex" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
        }}
      >
        <PerformanceInsightsCard />
        <TodaysInspectionsCard />
      </Box>

      <Box sx={{ p: 8 }}>
        <Typography>© 2023 The Legacy Senior Communities</Typography>
      </Box>
    </Container>
  );
};

export default dashboard;
