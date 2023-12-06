import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useMediaQuery,
  AppBar,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MemberTable from "../src/components/performanceDashboard/table";
import * as React from "react";
import { Navbar } from "../src/components";
import MembersPerformanceChart from "../src/components/performanceDashboard/charts/members_performanceChart";
import MemberButton from "../src/components/performanceDashboard/buttons/memberButton";
import DownloadButton from "../src/components/performanceDashboard/buttons/downloadButton";
import ScoreHistory from "../src/components/performanceDashboard/scoreHistory";
import MemberTabs from "../src/components/performanceDashboard/memberTabs";

const performance = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const IsXsScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedMember, setSelectedMember] = React.useState("member1");

  const handleMemberClick = (member: string) => {
    setSelectedMember(member);
  };

  
  const memberData = {
    member1: [
      { name: "Week 1", Score: 80 },
      { name: "Week 2", Score: 90 },
      { name: "Week 3", Score: 70 },
      { name: "Week 4", Score: 100 },
      { name: "Week 5", Score: 80 },
    ],
    member2: [
      { name: "Week 1", Score: 20 },
      { name: "Week 2", Score: 40 },
      { name: "Week 3", Score: 90 },
      { name: "Week 4", Score: 100 },
      { name: "Week 5", Score: 30 },
    ],
    member3: [
      { name: "Week 1", Score: 40 },
      { name: "Week 2", Score: 20 },
      { name: "Week 3", Score: 10 },
      { name: "Week 4", Score: 70 },
      { name: "Week 5", Score: 80 },
    ],
    member4: [
      { name: "Week 1", Score: 30 },
      { name: "Week 2", Score: 60 },
      { name: "Week 3", Score: 80 },
      { name: "Week 4", Score: 100 },
      { name: "Week 5", Score: 80 },
    ],
  };

  const memberScores = memberData[selectedMember].map((data) => data.Score);
  const averageScore =
    memberScores.reduce((total, score) => total + score, 0) /
    memberScores.length;
  const roundedAverageScore = Math.round(averageScore);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {!IsXsScreen && 
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <MemberTabs onMemberClick={handleMemberClick} />
            </Grid>
          }

          {!isSmScreen && (
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-evenly",
                  mt: 2,
                }}
              >
                <MemberButton member="member1" onClick={handleMemberClick} />
                <MemberButton member="member2" onClick={handleMemberClick} />
                <MemberButton member="member3" onClick={handleMemberClick} />
                <MemberButton member="member4" onClick={handleMemberClick} />
              </Box>
            </Grid>
          )}

          <Grid container item xs={12} sm={9} md={9} lg={9} spacing={2}>
            <Grid item xs={4} sm={3} md={3} lg={3}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  backgroundColor: "#fff",
                  marginLeft: "5px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: 14, sm: 20, md: 20, lg: 30 },
                    fontWeight: "bold",
                    mt: 2,
                  }}
                >
                  {`Member ${selectedMember.slice(-1)}`}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: 14, sm: 16, md: 20 },
                    fontWeight: "bold",
                    mt: 1,
                  }}
                >
                  Avg Score: {roundedAverageScore}%
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: {
                    xs: "10vw",
                  },
                  mr: {
                    lg: "15vw",
                    xl: "25vw",
                  }
                }}
              >
                <DownloadButton />
              </Box>
            </Grid>

            <Grid container item xs={12} sm={12} md={9} lg={9}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Box
                  sx={{
                    display: "flex",
                    width: {
                      xs: "80vw", // 50vw
                      sm: "55vw",
                      md: "50vw",
                      lg: "650px",
                    },
                  }}
                >
                  <MembersPerformanceChart
                    memberData={memberData[selectedMember]}
                  />
                </Box>
              </Grid>

              <Grid item xs={5} sm={5} md={6} lg={3.25}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    ml: {
                      xs: "5vw",
                      sm: "-10vw",
                      md: "0px",
                      lg: "0px",
                    },
                  }}
                >
                  <ScoreHistory />
                </Box>
              </Grid>

              <Grid item xs={6} sm={7} md={6} lg={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 1,
                    ml: {
                      xs: "5vw",
                      sm: "",
                      md: "3vw",
                      lg: "20vw",
                    },
                  }}
                >
                  <MemberTable />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{ p: 8 }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 14, sm: 16, nd: 20 },
                  }}
                >
                  © 2023 The Legacy Senior Communities
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default performance;


export const memberData = {
  member1: [
    { name: "Week 1", Score: 80 },
    { name: "Week 2", Score: 90 },
    { name: "Week 3", Score: 70 },
    { name: "Week 4", Score: 100 },
    { name: "Week 5", Score: 80 },
  ],
  member2: [
    { name: "Week 1", Score: 20 },
    { name: "Week 2", Score: 40 },
    { name: "Week 3", Score: 90 },
    { name: "Week 4", Score: 100 },
    { name: "Week 5", Score: 30 },
  ],
  member3: [
    { name: "Week 1", Score: 40 },
    { name: "Week 2", Score: 20 },
    { name: "Week 3", Score: 10 },
    { name: "Week 4", Score: 70 },
    { name: "Week 5", Score: 80 },
  ],
  member4: [
    { name: "Week 1", Score: 30 },
    { name: "Week 2", Score: 60 },
    { name: "Week 3", Score: 80 },
    { name: "Week 4", Score: 100 },
    { name: "Week 5", Score: 80 },
  ],
};