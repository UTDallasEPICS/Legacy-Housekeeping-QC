import { AppBar, Box, Button, Avatar, Typography } from "@mui/material";
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
  const { data: session } = useSession();
  const [loggedInUserInitial, setLoggedInUserInitial] = useState("U");
  useEffect(() => {
    setLoggedInUserInitial(session?.user?.first_name?.charAt(0));
    console.log(session?.user?.first_name);
  }, [session?.user?.first_name]);

  return (
    <AppBar
      aria-label="nav bar"
      component="nav"
      position="sticky"
      color="primary"
      sx={{
        display: "flex",
        flexDirection: "row",
        width: 1,
        p: 2,
        alignItems: "center",
      }}
    >
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
      <Button
        sx={{ color: "primary.contrastText", mx: 1 }}
        onClick={() => signOut()}
      >
        SignOut
      </Button>
      <Box>
        <Avatar sx={{ bgcolor: "secondary.main" }}>{loggedInUserInitial}</Avatar>
      </Box>
    </AppBar>
  );
}
