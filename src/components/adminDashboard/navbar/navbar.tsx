import { AppBar, Box, Button, Avatar, Typography } from "@mui/material";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
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
      <Typography variant="h6" sx={{ mx: 1 }}>
        Legacy<b>QC</b>
      </Typography>
      <Box sx={{ flex: 1 }}>
        <Button
          href={"/performance"}
          sx={{ color: "primary.contrastText", mx: 1 }}
          {...a11yProps(0)}
        >
          Performance
        </Button>
        <Button
          href={"/inspections"}
          sx={{ color: "primary.contrastText", mx: 1 }}
          {...a11yProps(1)}
        >
          Inspections
        </Button>
        <Button
          href={"/schedules"}
          sx={{ color: "primary.contrastText", mx: 1 }}
          {...a11yProps(2)}
        >
          Schedules
        </Button>
        <Button
          href={"/teamMembers"}
          sx={{ color: "primary.contrastText", mx: 1 }}
          {...a11yProps(3)}
        >
          Team Members
        </Button>
        <Button
          href={"/rooms"}
          sx={{ color: "primary.contrastText", mx: 1 }}
          {...a11yProps(4)}
        >
          Rooms
        </Button>
      </Box>
      <Box>
        <Avatar sx={{ bgcolor: "secondary.main" }}>U</Avatar>
      </Box>
    </AppBar>
  );
}
