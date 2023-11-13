// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { signOut } from "next-auth/react";
// import Link from "next/link";

// import { NavbarButton } from "../..";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useTheme } from "@emotion/react";

// import { Menu as MenuIcon } from "@mui/icons-material";
// //import { useTheme } from "@mui/material/styles";
// //import useMediaQuery from "@mui/material/useMediaQuery";

// export default function navbar() {
//   // GET INITIAL FOR AVATAR ******************************************
//   const { data: session } = useSession();
//   const [signedInUserInitial, setSignedInUserInitial] = useState("U");
//   useEffect(() => {
//     setSignedInUserInitial(session?.user?.first_name?.charAt(0));

//     // For debugging only:
//     // console.log(signedInUserInitial);
//   }, [session?.user?.first_name]);
//   // *****************************************************************

//   const theme = useTheme();
//   const isMobile = useMediaQuery("sm");

//   return (
//     <AppBar
//       aria-label="nav bar"
//       component="nav"
//       position="sticky"
//       color="primary"
//       sx={{
//         width: 1,
//         p: 2,
//       }}
//     >
//       <Container
//         sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
//       >
//         <Link
//           href="/admin/adminDashboard"
//           style={{
//             textDecoration: "none",
//             color: "white",
//           }}
//         >
//           <Typography variant="h6" sx={{ mx: 1 }}>
//             <b>LegacyQC</b>
//           </Typography>
//         </Link>

//         <Box sx={{ flex: 1 }}>
//           <NavbarButton
//             linkTo="/members_performance"
//             text="Performance"
//           ></NavbarButton>
//           <NavbarButton
//             linkTo="/admin/inspections"
//             text="Inspections"
//           ></NavbarButton>
//           <NavbarButton
//             linkTo="/admin/schedules"
//             text="Schedules"
//           ></NavbarButton>
//           <NavbarButton
//             linkTo="/admin/teamMembers"
//             text="Team Members"
//           ></NavbarButton>
//           <NavbarButton
//             linkTo="/admin/roomPages/buildingChoice"
//             text="Rooms"
//           ></NavbarButton>
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: "row" }}>
//           <Button
//             sx={{ color: "primary.contrastText", mx: 1 }}
//             onClick={() => signOut()}
//           >
//             Sign Out
//           </Button>
//           <Avatar sx={{ bgcolor: "secondary.main", mx: 1 }}>
//             {signedInUserInitial}
//           </Avatar>
//         </Box>
//       </Container>
//     </AppBar>
//   );
// }


//TESTING MOBILE SCREEN NAVBAR
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const { data: session } = useSession();
  const [signedInUserInitial, setSignedInUserInitial] = useState("U");
  useEffect(() => {
    setSignedInUserInitial(session?.user?.first_name?.charAt(0));
  }, [session?.user?.first_name]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton
          aria-label="menu"
          color="inherit"
          onClick={toggleDrawer}
          sx={{ display: isMobile ? "block" : "none" }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href="/admin/adminDashboard"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Typography variant="h6" sx={{ mx: 1 }}>
            <b>LegacyQC</b>
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: isMobile ? "none" : "flex" }}>
          <Avatar
            sx={{ bgcolor: "secondary.main", mr: 1 }}
            alt="signed-in user initial"
          >
            {signedInUserInitial}
          </Avatar>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            {session?.user?.first_name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ display: isMobile ? "block" : "none" }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}