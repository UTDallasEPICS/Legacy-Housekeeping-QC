import { Box, Divider, Typography } from "@mui/material";
import { DayTimeSelectionPanel, Navbar, PageHeading, ScheduleRoomPanel, ScheduleWeekPanel } from "../../src/components";

const schedules = () => {
  return(
    <Box>
      <Navbar/>
      <PageHeading text="SCHEDULE"/>
      <Divider/>
      
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        }}>
        <ScheduleWeekPanel/>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          minWidth: '70vh',
          maxWidth: '75vh',
          maxHeight: '30vh',
          minHeight: '30vh',
          padding: 5,
          marginTop: .5,
          backgroundColor: 'gray',
          alignItems: 'center',
          borderRadius: 2,
          borderWidth: 3,
          borderColor: 'lightgray',
          borderStyle: 'solid',
          }}>
          <DayTimeSelectionPanel day = "MONDAY"/>
          <DayTimeSelectionPanel day = "TUESDAY"/>
          <DayTimeSelectionPanel day = "WEDNESDAY"/>
          <DayTimeSelectionPanel day = "THURSDAY"/>
          <DayTimeSelectionPanel day = "FRIDAY"/>
        </Box>
        <ScheduleRoomPanel/>
      </Box>
      
    </Box>
  );
};

export default schedules;
