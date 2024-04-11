import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  AppBar,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MemberTable from "../src/components/performanceDashboard/table";
import React, {useState, useEffect} from "react";
import { Navbar } from "../src/components";
import MembersPerformanceChart from "../src/components/performanceDashboard/charts/members_performanceChart";
import MemberButton from "../src/components/performanceDashboard/buttons/memberButton";
import ScoreHistory from "../src/components/performanceDashboard/scoreHistory";
import MemberTabs from "../src/components/performanceDashboard/memberTabs";

const performance = () => { 
  const theme = useTheme();
  //const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //const IsXsScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [scores, setScores] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  const handleMemberClick = (member: JSON) => {
    setSelectedMember(member);
  };

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
  }

  const getScores = async (member) => {
    try {
      const response = await fetch("http://localhost:3000/api/member/getScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_date: "2023-04-01T00:00:00.000Z",
          to_date: "2024-04-11T00:00:00.000Z",
          member_id: member["id"],
        })
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch scores");
      }
  
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);

  // set first selected member after we get members[]
  useEffect(() => {
    setSelectedMember(members[0]);
  }, [members]);

  // after every select update the scores[]
  useEffect(() => {
    getScores(selectedMember);
  }, [selectedMember]);

  // after scores[] is updated update the average score
  useEffect(() => {
    const memberScores = scores.map((data) => data.amount);
    const averageScore = memberScores.reduce((total, score) => total + score, 0) / memberScores.length;
    setAverageScore(Math.round(averageScore));
  }, [scores]);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {/* member list */}
          <Grid item xs={3} sm={3} md={3} lg={3}>
              <Box
                sx={{    
                  overflowX: "hidden",
                  overflowY: "scroll", 
                  width: "min(21vw, 300px)",
                  height: "70vh",
                  display: "justified",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-evenly",
                  marginTop: 2,
                }}
              >
                {members.map((member, index) => (
                  <MemberButton
                    key={index}
                    member={member}
                    onClick={handleMemberClick}
                  />))
                }
              </Box>
          </Grid>

          {/* name, chart, and score history */}
          <Grid container item xs={12} sm={9} md={9} lg={9} spacing={1}>
            {/* name and average score */}
            <Grid item xs={4} sm={3} md={3} lg={4}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginLeft: "30px",
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
                  {selectedMember ? `${selectedMember.first_name} ${selectedMember.last_name}` : "Loading..."}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: 14, sm: 16, md: 20 },
                    fontWeight: "bold",
                    marginTop: 1,
                  }}
                >
                  Average Score: {averageScore}%
                </Typography>
              </Box>
            </Grid>
            
            {/* performance chart and score history */}
            <Grid container item xs={12} sm={12} md={9} lg={9}>
              {/* dynamic performance chart */}
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Box
                  sx={{
                    display: "flex",
                    width: {
                      xs: "80vw", 
                      sm: "55vw",
                      md: "50vw",
                      lg: "650px",
                    },
                  }}
                >
                    <MembersPerformanceChart memberData={scores}/>
                </Box>
              </Grid>
              
              <Grid item xs={5} sm={5} md={6} lg={3.25}>
                {/* highest and lowest scores table */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    ml: {
                      xs: "5vw",
                      sm: "-10vw",
                      md: "0px",
                      lg: "0px",
                    },
                  }}
                >
                  <ScoreHistory memberData={scores}/>
                </Box>
              </Grid>

              {/* scores[] doesnt have the specific data usable for membertable

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
                  <MemberTable/>
                </Box>
              </Grid>*/}
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
                  © 2024 The Legacy Senior Communities
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