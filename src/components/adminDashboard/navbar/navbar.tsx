import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { montserrat } from "../../../../pages/theme";

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

  const theme = useTheme();
  const burgerBreakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const footlongBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

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
      <Container sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link
            href="/admin/adminDashboard"
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mx: 1, fontFamily: montserrat.style.fontFamily }}
            >
              <b>LegacyQC</b>
            </Typography>
          </Link>
          {burgerBreakpoint && <NavbarBurger />}
          {footlongBreakpoint && <NavbarFootlong />}
        </Box>

        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              color: "primary",
              mx: 1,
              fontFamily: montserrat.style.fontFamily,
            }}
            variant="outlined"
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

const menuItems = [
  { link: "/members_performance", text: "Performance" },
  { link: "/admin/inspections", text: "Inspections" },
  { link: "/admin/schedules", text: "Schedules" },
  { link: "/admin/teamMembers", text: "Team Members" },
  { link: "/admin/roomPages/buildingChoice", text: "Rooms" },
];

const NavbarBurger = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.text} href={item.link} component="a">
            <Typography
              fontFamily={montserrat.style.fontFamily}
              textTransform={"uppercase"}
              fontSize={14}
              color={"primary"}
            >
              {item.text}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
const NavbarFootlong = () => {
  return (
    <Box sx={{ flex: 1 }}>
      {menuItems.map((item) => (
        <Button key={item.text} href={item.link} LinkComponent={Link}>
          <Typography
            fontSize={14}
            fontFamily={montserrat.style.fontFamily}
            textTransform={"uppercase"}
            color={"primary"}
          >
            {item.text}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};
