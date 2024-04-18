import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { NavbarButton } from "../..";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import theme, { montserrat } from "../../../../pages/theme";

export default function navbar() {
  // GET INITIAL FOR AVATAR ******************************************
  const { data: session } = useSession();
  const [signedInUserInitial, setSignedInUserInitial] = useState("U");
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
      sx={{
        width: 1,
        p: 2,
        backgroundColor: "white",
      }}
    >
      <Container
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {/* LegacyQC button that goes to main dashboard */}
        <Link
          href="/admin/adminDashboard"
          style={{
            textDecoration: "none",
            color: theme.palette.primary.main,
          }}
        >
          <Typography variant="h6" sx={{ mx: 1, fontFamily: montserrat.style.fontFamily }}>
            <b>LegacyQC</b>
          </Typography>
        </Link>

        <Box sx={{ flex: 1 }}>
          <NavbarButton
            linkTo="/members_performance"
            text="Performance"
          ></NavbarButton>
          <NavbarButton
            linkTo="/admin/inspections"
            text="Inspections"
          ></NavbarButton>
          <NavbarButton
            linkTo="/admin/schedules"
            text="Schedules"
          ></NavbarButton>
          <NavbarButton
            linkTo="/admin/teamMembers"
            text="Team Members"
          ></NavbarButton>
          <NavbarButton
            linkTo="/admin/roomPages/buildingChoice"
            text="Rooms"
          ></NavbarButton>
        </Box>

        {/* sign out and user avatar buttons */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={{ color: "primary", mx: 1, fontFamily: montserrat.style.fontFamily }}
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
          <Avatar sx={{ bgcolor: "secondary.main", mx: 1 }}>
            {signedInUserInitial}
          </Avatar>
        </Box>
      </Container>
    </AppBar>
  );
}
