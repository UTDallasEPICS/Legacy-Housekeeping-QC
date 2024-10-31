import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { montserrat } from "../../../theme";

export default function navbar() {
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
        p: 1,
        backgroundColor: theme.palette.navbar.background,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Link
          href="/admin/adminDashboard"
          style={{
            textDecoration: "none",
            color: theme.palette.text.secondary,
          }}
        >
          <Typography
            variant="h6"
            sx={{ mx: 1, fontFamily: montserrat.style.fontFamily }}
          >
            <Box
              component="img"
              src="../../../logo.png"
              alt="The Legacy"
              sx={{ height: 75 }}
              border={2}
            />
          </Typography>
        </Link>
        {burgerBreakpoint && <NavbarBurger />}
        {footlongBreakpoint && <NavbarFootlong />}
      </Box>

      <UserBurger />
    </AppBar>
  );
}

const menuItems = [
  { link: "/admin/members_performance", text: "Performance" },
  { link: "/admin/inspections", text: "Inspections" },
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
              fontWeight="bold"
              fontSize={14}
              color={"text.secondary"}
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
            color={"text.secondary"}
          >
            {item.text}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

const UserBurger = () => {
  // GET INITIAL FOR AVATAR ******************************************
  const { data: session } = useSession();
  const [signedInUserInitial, setSignedInUserInitial] = useState("U");
  useEffect(() => {
    setSignedInUserInitial(session?.user?.first_name?.charAt(0));

    // For debugging only:
    // console.log(signedInUserInitial);
  }, [session?.user?.first_name]);
  // *****************************************************************
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button onClick={(e) => setAnchor(e.currentTarget)}>
        <Avatar sx={{ bgcolor: "secondary.main", mx: 1, color: "white" }}>
          {signedInUserInitial}
        </Avatar>
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => signOut()}>
          <Typography
            fontSize={14}
            fontFamily={montserrat.style.fontFamily}
            textTransform={"uppercase"}
            color={"primary"}
          >
            Sign Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
