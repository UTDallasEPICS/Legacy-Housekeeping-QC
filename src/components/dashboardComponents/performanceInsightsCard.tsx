import { Box, Card, Divider, List, Typography } from "@mui/material";

import DashboardCardButton from "./dashboardCardButton";
import DashboardCardHeading from "./dashboardCardHeading";
import DashboardCardProgressListItemButton from "./dashboardCardProgressListItemButton";

import { useEffect, useState } from "react";

const performanceInsightsCard = () => {
  // GET TEAM MEMBER POINTS DATA TO CALCULATE AND DISPLAY AVERAGE CLEANING SCORE
  // ***************************************************************************
  const [averageCleaningScoreString, setAverageCleaningScoreString] =
    useState("N/A");

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
    return (totalNumPoints / (totalNumPointsRecords * 100.0)) * 100;
  };

  useEffect(() => {
    calculateAverageCleaningScore().then(
      (result) => {
        setAverageCleaningScoreString(`${result.toFixed(2)}`);
      },
      (error) => {
        setAverageCleaningScoreString("N/A");
        console.log(error);
      }
    );
  });
  // ***************************************************************************

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
      <DashboardCardHeading text="Performance Insights" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: 1,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5">Average Cleaning Score</Typography>
          <Typography variant="h2">{averageCleaningScoreString}</Typography>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ pt: 2, pb: 1 }}>
          <Typography variant="h5">On the Rise</Typography>
          <List>
            <DashboardCardProgressListItemButton
              memberName="John Smith"
              scoreChange={6.8}
            />
            <DashboardCardProgressListItemButton
              memberName="Ima Good"
              scoreChange={5.7}
            />
            <DashboardCardProgressListItemButton
              memberName="Foofoo Doe"
              scoreChange={2.9}
            />
          </List>
        </Box>

        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography variant="h5">Declining</Typography>
          <List>
            <DashboardCardProgressListItemButton
              memberName="Jane Doe"
              scoreChange={-3.5}
            />
            <DashboardCardProgressListItemButton
              memberName="Some Guy"
              scoreChange={-2.5}
            />
            <DashboardCardProgressListItemButton
              memberName="Imnoto Good"
              scoreChange={-1.4}
            />
          </List>
        </Box>
      </Box>

      <Divider variant="middle" />

      <DashboardCardButton
        linkTo="/admin/performance"
        text="More performance data"
      />
    </Card>
  );
};

export default performanceInsightsCard;
