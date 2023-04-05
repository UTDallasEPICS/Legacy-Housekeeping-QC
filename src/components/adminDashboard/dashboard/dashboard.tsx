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

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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

  // GET FIRST NAME TO DISPLAY ****************************
  const { data: session } = useSession();
  const [signedInUser, setSignedInUser] = useState("User");
  useEffect(() => {
    setSignedInUser(session?.user?.first_name);

    // For debugging only:
    // console.log(signedInUser);
  }, [session?.user?.first_name]);
  // ******************************************************

  // GET TEAM MEMBER POINTS DATA TO CALCULATE AND DISPLAY AVERAGE CLEANING SCORE
  // ***************************************************************************
  const [averageCleaningScoreString, setAverageCleaningScoreString] = useState("N/A");

  // calculateAverageCleaningScore: Implicitly returns a Promise<number>.
  const calculateAverageCleaningScore = async () => {
    // Get team member data for all team members.
    const res = await fetch("http://localhost:3000/api/member/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Convert the response to JSON.
    const resJson = await res.json();

    // Get the number of members in the database.
    let resLength = Object.keys(resJson).length;

    let totalNumPoints = 0;
    let totalNumPointsRecords = 0;

    for (let i = 0; i < resLength; i++) {
      // Add total number of points each member has earned to total points all members have earned.
      totalNumPoints += resJson[i].total_points;

      // Add total number of times each member has earned points to total times all members have earned points.
      totalNumPointsRecords += Object.keys(resJson[i].points).length;
    }

    // Calculate average cleaning score as a percentage.
    // This is done by taking the ratio of the total number of points all members did earn to the total possible number of points members could have earned.
    return totalNumPoints / (totalNumPointsRecords * 100.0) * 100;
  };

  calculateAverageCleaningScore().then(
    (result) => {
      setAverageCleaningScoreString(`${result.toFixed(2)}`);
    },
    (error) => {
      setAverageCleaningScoreString("N/A");
      console.log(error);
    });
  // ***************************************************************************

  return (
    <Box component={"div"} sx={{ height: "100%" }}>
      <Container sx={{ textAlign: "center", height: 1 }}>
        <Box sx={{ p: { xs: 4, sm: 8, md: 12 } }}>
          <Typography variant="h2">Hello,<b> {signedInUser}.</b></Typography>
        </Box>

        <Box sx={{ justifyContent: "center", display: { md: "flex" } }}>
          <Card sx={{ m: 2, flexBasis: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <DashboardCardHeading title="Performance Insights"></DashboardCardHeading>

            <Box sx={{ display: "flex", flexDirection: "column", width: 1, flexGrow: 1 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">Average Cleaning Score</Typography>
                <Typography variant="h2">{averageCleaningScoreString}</Typography>
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

            <DashboardCardButton href="/admin/performance" text="More performance data"></DashboardCardButton>
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

            <DashboardCardButton href="/admin/inspections" text="All inspections"></DashboardCardButton>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default dashboard;
