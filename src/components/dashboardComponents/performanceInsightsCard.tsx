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
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [scores, setScores] = useState([]);
    const [averageScore, setAverageScore] = useState(0);
    const [searchInput, setSearchInput] = useState("");
  
    // Fetch members from API
    const getMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/member/members", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
  
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    // Get team member data for all team members.
    const getScores = async (member) => {
    try {
      const response = await fetch("/api/member/getScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_date: "2023-04-01T00:00:00.000Z",
          to_date: new Date().toISOString(),
          member_id: member.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch scores");
      }

      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }

    // Convert the response to JSON.
    const resJson = await Response.json();

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
              memberName="John Cena"
              scoreChange={100}
            />
            <DashboardCardProgressListItemButton
              memberName="Lionel Messi"
              scoreChange={100}
            />
            <DashboardCardProgressListItemButton
              memberName="Sachin Tendulkar"
              scoreChange={100}
            />
          </List>
        </Box>

        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography variant="h5">Declining</Typography>
          <List>
            <DashboardCardProgressListItemButton
              memberName="Cristiano Ronaldo"
              scoreChange={-30}
            />
            <DashboardCardProgressListItemButton
              memberName="Glenn Maxwell"
              scoreChange={-45}
            />
            <DashboardCardProgressListItemButton
              memberName="Neyman Jr"
              scoreChange={-50}
            />
          </List>
        </Box>
      </Box>

      <Divider variant="middle" />

      <DashboardCardButton
        linkTo="/members_performance"
        text="More performance data"
      />
    </Card>
  );
};

export default performanceInsightsCard;
