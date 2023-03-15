import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "primary.main", borderBottom: 3, borderColor: "divider" }}>
        <Tabs aria-label="nav bar">
          <Link href={"/performance"}>
            <Tab label="Performance" {...a11yProps(0)} />
          </Link>
          <Link href={"/inspections"}>
            <Tab label="Inspections" {...a11yProps(1)} />
          </Link>
          <Link href={"/schedules"}>
            <Tab label="Schedules" {...a11yProps(2)} />
          </Link>
          <Link href={"/teamMembers"}>
            <Tab label="Team Members" {...a11yProps(3)} />
          </Link>
          <Link href={"/rooms"}>
            <Tab label="Rooms" {...a11yProps(4)} />
          </Link>
          <Link href={"/userName"}>
            <Tab label="User Name" {...a11yProps(5)} />
          </Link>
        </Tabs>
      </Box>
    </Box>
  );
}
