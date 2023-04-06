import { AppBar, Box, Button, Avatar, Typography, Container } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  // GET INITIAL FOR AVATAR ******************************************
  const { data: session } = useSession();
  const [signedInUserInitial, setSignedInUserInitial] = useState('U');
  useEffect(() => {
    setSignedInUserInitial(session?.user?.first_name?.charAt(0));

    // For debugging only:
    // console.log(signedInUserInitial);
  }, [session?.user?.first_name]);
  // *****************************************************************

  return (
    <AppBar
      aria-label="nav bar"
      component="nav"
      position="sticky"
      color="primary"
      sx={{
        width: 1,
        p: 2,
      }}
    >
      <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Link href={"/admin/adminDashboard"} style={{
          textDecoration: "none",
          color: "white"
        }}>
          <Typography variant="h6" sx={{ mx: 1 }}>
            Legacy<b>QC</b>
          </Typography>
        </Link>
        <Box sx={{ flex: 1 }}>
          <Button
            href={"/admin/performance"}
            sx={{ color: "primary.contrastText", mx: 1 }}
            {...a11yProps(0)}
          >
            Performance
          </Button>
          <Button
            href={"/admin/inspections"}
            sx={{ color: "primary.contrastText", mx: 1 }}
            {...a11yProps(1)}
          >
            Inspections
          </Button>
          <Button
            href={"/admin/schedules"}
            sx={{ color: "primary.contrastText", mx: 1 }}
            {...a11yProps(2)}
          >
            Schedules
          </Button>
          <Button
            href={"/admin/teamMembers"}
            sx={{ color: "primary.contrastText", mx: 1 }}
            {...a11yProps(3)}
          >
            Team Members
          </Button>
          <Button
            href={"/admin/rooms"}
            sx={{ color: "primary.contrastText", mx: 1 }}
            {...a11yProps(4)}
          >
            Rooms
          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: "primary.contrastText", mx: 1 }}
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
          <Avatar sx={{ bgcolor: "secondary.main" }}>{signedInUserInitial}</Avatar>
        </Box>
      </Container>
    </AppBar>
  );
}
