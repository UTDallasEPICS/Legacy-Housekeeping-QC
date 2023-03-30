import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Divider, ToggleButtonGroup, ToggleButton } from "@mui/material";

import DashboardCardHeading from "../../dashboardCardComponents/DashboardCardHeading";
import DashboardCardProgressListItemButton from "../../dashboardCardComponents/DashboardCardProgressListItemButton";
import DashboardCardButton from "../../dashboardCardComponents/DashboardCardButton";
import DashboardCardInspectionListItemCard from "../../dashboardCardComponents/DashboardCardInspectionListItemCard";
import RemainingInspectionListItemCard from "../../dashboardCardComponents/RemainingInspectionListItemCard";

import { useState } from "react";

const dashboard = () => {
  const [todaysInspectionsType, setTodaysInspectionsType] = useState("completed");

  const handleTodaysInspectionsType = (
    event: React.MouseEvent<HTMLElement>,
    newTodaysInspectionsType: string | null
  ) => {
    if (newTodaysInspectionsType !== null) {
      setTodaysInspectionsType(newTodaysInspectionsType);
    }
  };

  return (
    <Box component={"div"} sx={{ height: "100%" }}>
      <Container sx={{ textAlign: "center", height: 1 }}>
        <Box sx={{ p: { sm: 8, md: 12 } }}>
          <Typography variant="h2">Hello,<b> User</b></Typography>
        </Box>

        <Box sx={{ justifyContent: "center", display: { md: "flex" } }}>
          <Card sx={{ m: 2, flexBasis: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <DashboardCardHeading title="Performance Insights"></DashboardCardHeading>

            <Box sx={{ display: "flex", flexDirection: "column", width: 1, flexGrow: 1 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">Average Cleaning Score</Typography>
                <Typography variant="h2">87.6</Typography>
              </Box>

              <Divider variant="middle" />

              <Box>
                <Box sx={{ pt: 2, pb: 1 }}>
                  <Typography variant="h5">On the Rise</Typography>
                  <List>
                    <DashboardCardProgressListItemButton
                      teamMemberName="Team Member 1"
                      teamMemberId="00556"
                      scoreChange="+6.8"
                      type="onTheRise"
                    ></DashboardCardProgressListItemButton>
                    <DashboardCardProgressListItemButton
                      teamMemberName="Team Member 1"
                      teamMemberId="00556"
                      scoreChange="+6.8"
                      type="onTheRise"
                    ></DashboardCardProgressListItemButton>
                    <DashboardCardProgressListItemButton
                      teamMemberName="Team Member 1"
                      teamMemberId="00556"
                      scoreChange="+6.8"
                      type="onTheRise"
                    ></DashboardCardProgressListItemButton>
                  </List>
                </Box>

                <Box sx={{ pt: 1, pb: 2 }}>
                  <Typography variant="h5">Declining</Typography>
                  <List>
                    <DashboardCardProgressListItemButton
                      teamMemberName="Team Member 2"
                      teamMemberId="00557"
                      scoreChange="-3.5"
                      type="declining"
                    ></DashboardCardProgressListItemButton>
                    <DashboardCardProgressListItemButton
                      teamMemberName="Team Member 2"
                      teamMemberId="00557"
                      scoreChange="-3.5"
                      type="declining"
                    ></DashboardCardProgressListItemButton>
                    <DashboardCardProgressListItemButton
                      teamMemberName="Team Member 2"
                      teamMemberId="00557"
                      scoreChange="-3.5"
                      type="declining"
                    ></DashboardCardProgressListItemButton>
                  </List>
                </Box>
              </Box>
            </Box>

            <Divider variant="middle" />

            <DashboardCardButton href="/performance" text="More performance data"></DashboardCardButton>
          </Card>

          <Card sx={{ m: 2, display: "flex", flexDirection: "column", flexBasis: 0, flexGrow: 1 }}>
            <DashboardCardHeading title="Today's Inspections"></DashboardCardHeading>

            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Box sx={{ p: 2 }}>
                <ToggleButtonGroup
                  value={todaysInspectionsType}
                  exclusive
                  onChange={handleTodaysInspectionsType}>
                  <ToggleButton value="completed">Completed</ToggleButton>
                  <ToggleButton value="remaining">Remaining</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Divider variant="middle" />

              <Box sx={{ py: 1, flexGrow: 1, height: "616px", overflowY: "auto" }}>
                {(todaysInspectionsType === "completed") && (<List>
                  <DashboardCardInspectionListItemCard
                    buildingId="A"
                    roomId="401A"
                    teamMemberName="Team Member 3"
                    leaderName="Leader 1"
                    timeCleaned="12:46 PM"
                    score="98"
                    type="pass"></DashboardCardInspectionListItemCard>
                  <DashboardCardInspectionListItemCard
                    buildingId="C"

                    roomId="S. 2C Living Room"
                    teamMemberName="Team Member 3"
                    leaderName="Leader 1"
                    timeCleaned="12:46 PM"
                    score="98"
                    type="pass"></DashboardCardInspectionListItemCard>
                  <DashboardCardInspectionListItemCard
                    buildingId="C"

                    roomId="C Main Entrance Vestibule"
                    teamMemberName="Team Member 3"
                    leaderName="Leader 1"
                    timeCleaned="12:46 PM"
                    score="98"
                    type="pass"></DashboardCardInspectionListItemCard>
                  <DashboardCardInspectionListItemCard
                    buildingId="B"

                    roomId="212B"
                    teamMemberName="Team Member 3"
                    leaderName="Leader 1"
                    timeCleaned="12:46 PM"
                    score="98"
                    type="pass"></DashboardCardInspectionListItemCard>
                </List>)}
                {(todaysInspectionsType === "remaining") && (<List>
                  <RemainingInspectionListItemCard
                    buildingId="B"
                    roomId="212B"
                    teamMemberName="Team Member 3"
                    timeCleaned="12:46 PM"
                    cleaningType="Daily"
                  ></RemainingInspectionListItemCard>
                </List>)}
              </Box>
            </Box>

            <Divider variant="middle" />

            <DashboardCardButton href="/inspections" text="All inspections"></DashboardCardButton>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default dashboard;
