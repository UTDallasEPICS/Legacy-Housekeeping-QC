import {
  Box,
  Card,
  Divider,
  List,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import DashboardCardButton from "./dashboardCardButton";
import DashboardCardHeading from "./dashboardCardHeading";
import CompletedInspectionListItemCard from "../globalComponents/completedInspectionListItemCard";
import RemainingInspectionListItemCard from "../globalComponents/remainingInspectionListItemCard";

import { useState } from "react";

const todaysInspectionsCard = () => {
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
    <Card
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
        flexBasis: 0,
        flexGrow: 1,
      }}
    >
      <DashboardCardHeading text="Today's Inspections" />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, width: 1 }}>
        <Box sx={{ p: 2 }}>
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

        <Box sx={{ py: 1, overflowY: "auto" }}>
          {todaysInspectionsType === "completed" && (
            <List>
              <CompletedInspectionListItemCard
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
              />
            </List>
          )}

          {todaysInspectionsType === "remaining" && (
            <List>
              <RemainingInspectionListItemCard
                roomId="S. 2C Living Room"
                memberName="Jane Doe"
                cleaningType="Detail"
                timeCleaned="3:48 PM"
              />
            </List>
          )}
        </Box>
      </Box>

      <Divider variant="middle" />

      <DashboardCardButton linkTo="/admin/inspections" text="All inspections" />
    </Card>
  );
};

export default todaysInspectionsCard;
