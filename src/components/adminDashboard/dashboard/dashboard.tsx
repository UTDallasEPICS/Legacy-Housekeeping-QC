import { Box, Container, Typography } from "@mui/material";

import { PerformanceInsightsCard, TodaysInspectionsCard } from "../..";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const dashboard = () => {
  // GET FIRST NAME TO DISPLAY ****************************
  const { data: session, status } = useSession();
  const [signedInUser, setSignedInUser] = useState("User");

  useEffect(() => {
    console.log(session?.user?.first_name);
    console.log('Session status:', status);
    console.log('Session data:', session);
    if (status === "loading") {
      console.log('Loading user data...');
    } else if (session && session.user) {
      console.log('User data:', session.user);
      console.log('User first name:', session.user.first_name);
    } else {
      console.log('No user data');
    }

    //Auth0 user data
    const fullName = session?.user?.name;
    
    const toTitleCase = (str: string) => {
      return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    const firstName = fullName?.split(' ')[0] ? toTitleCase(fullName.split('.')[0]) : undefined;


    setSignedInUser(session?.user?.first_name || firstName || "User");
    // For debugging only:
    // console.log(signedInUser);
  }, [session, status]);
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
