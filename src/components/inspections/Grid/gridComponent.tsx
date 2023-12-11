import { Card, Grid, Typography } from "@mui/material";
import { CompleteGrid, LockedGrid, RemainingGrid } from "../..";
import ReportForm from "./ReportForm"; // import the ReportForm component


import {
  Box,
  Divider,
  List,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import DashboardCardButton from "../../dashboardComponents/dashboardCardButton";
import DashboardCardHeading from "../../dashboardComponents/dashboardCardHeading";
import CompletedInspectionListItemCard from "../../globalComponents/completedInspectionListItemCard";
import RemainingInspectionListItemCard from "../../globalComponents/remainingInspectionListItemCard";


import { useState } from "react";

 
const GridComponent = ({ reports }) => {
  let notClean = [];
  let clean = [];
  reports?.map((report) => {
    report.cleaned ? clean.push(report) : notClean.push(report);
  });

  // TODAY'S INSPECTIONS TOGGLE BUTTON GROUP **************
  const [todaysInspectionsType, setTodaysInspectionsType] =
    useState("completed");

  const handleTodaysInspectionsType = (
    event: React.MouseEvent<HTMLElement>,
    newTodaysInspectionsType: string | null
  ) => {
    if (newTodaysInspectionsType !== null) {
      setTodaysInspectionsType(newTodaysInspectionsType);
    }
  };
  // ******************************************************

  return (
    <>
      <Box sx={{/*display: "column", alignContent: "center", justifyContent: "center", alignItems: "center"*/}}>

      
      
      <Card
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
        flexBasis: 0,
        flexGrow: 1,
        //width: "max-content",
      }}
    >
      <DashboardCardHeading text="Inspections" />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, width: 1 }}>
        <Box sx={{ p: 2, alignContent: "center", alignItems: "center" }}>
          <ToggleButtonGroup
            value={todaysInspectionsType}
            exclusive
            onChange={handleTodaysInspectionsType}
          >
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="remaining">Remaining</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ py: 1, width: "max-content", overflowY: "visible" }}>
          {todaysInspectionsType === "completed" && (
            <List sx={{width: "fit-content"}}>
              <CompleteGrid reports={clean} /> {/* *******************************************/}

              {/* <CompletedInspectionListItemCard
                roomId="212B"
                memberName="John Smith"
                timeCleaned="10:16 AM"
                score={62}
                type="fail"
              />
              <CompletedInspectionListItemCard
                roomId="401A"
                memberName="Some Guy"
                timeCleaned="12:45 PM"
                score={85}
                type="pass"
              /> */}
            </List>
          )}

          {todaysInspectionsType === "remaining" && (
            <List>
              <RemainingGrid reports={notClean} /> {/* *******************************************/}
              {/* <RemainingInspectionListItemCard
                roomId="S. 2C Living Room"
                memberName="Jane Doe"
                cleaningType="Detail"
                timeCleaned="3:48 PM"
              /> */}
            </List>
          )}
        </Box>
      </Box>
    </Card>
    
    <Card 
    sx={{
      m: 2,
      display: "flex",
      flexDirection: "column",
      flexBasis: 0,
      flexGrow: 1,
      //width: "max-content",
    }}>
      <DashboardCardHeading text="Add Inspection" />
      <ReportForm/> {/*Form to manually add new report to the database*/}
      </Card>
    
    </Box>

    
      {/* <Grid
        container
        justifyContent="center"
        rowSpacing={2}
        spacing={6}
        sx={{ pt: 24, px: 24, pb: 0 }}
      >
        <Grid item xs={4}>
          <Typography>Complete:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Remaining:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Locked:</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        rowSpacing={2}
        spacing={6}
        sx={{ pt: 2, px: 24 }}
      >
        <CompleteGrid reports={clean} />
        <RemainingGrid reports={notClean} />
        <LockedGrid reports={notClean} />
      </Grid> */}
    </>
  );
};

export default GridComponent;
