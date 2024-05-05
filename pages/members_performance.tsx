import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, InputBase, List } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Navbar } from "../src/components";
import MembersPerformanceChart from "../src/components/performanceDashboard/charts/members_performanceChart";
import MemberButton from "../src/components/performanceDashboard/buttons/memberButton";
import ScoreHistory from "../src/components/performanceDashboard/scoreHistory";

const Performance = () => {
  // State variables
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

  // Fetch scores for selected member from API
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
  };

  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  // Handler for member click
  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  // Filter members based on search input
  const filteredMembers = members.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchInput) ||
      member.last_name.toLowerCase().includes(searchInput)
  );

  // Effect to fetch members on component mount
  useEffect(() => {
    getMembers();
  }, []);

  // Effect to set selected member when members array changes
  useEffect(() => {
    setSelectedMember(members[0]);
  }, [members]);

  // Effect to fetch scores when selected member changes
  useEffect(() => {
    if (selectedMember) {
      getScores(selectedMember);
    }
  }, [selectedMember]);

  // Effect to calculate average score when scores array changes
  useEffect(() => {
    const memberScores = scores.map((data) => data.amount);
    const averageScore = memberScores.reduce((total, score) => total + score, 0) / memberScores.length;
    setAverageScore(Math.round(averageScore));
    console.log("Scores:", scores);
  }, [scores]);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {/* Member List */}
          <Grid item xs={3} sm={3} md={3} lg={3}>
            
            {/* Search Bar */}
            <Box sx={{ marginTop: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  mb: 2,
                  ml: 1,
                }}
              >
                <Search sx={{ color: "secondary.main", ml: 2 }} />
                <InputBase
                  placeholder="Search Team Members"
                  inputProps={{ "aria-label": "search" }}
                  value={searchInput}
                  onChange={handleSearchChange}
                  sx={{ ml: 1, flex: 1 }}
                />
              </Box>
            </Box>

            {/* Member List Buttons */}
            <Box
              sx={{
                width: "min(21vw, 300px)",
                flex: 1,
                overflowY: "auto",
                position: "relative",
                justifyContent: "center",
              }}
            >
              <List>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <MemberButton key={member.id} member={member} onClick={handleMemberClick} />
                  ))
                ) : (
                  <Typography variant="h5" sx={{ p: 2 }}>
                    Empty list
                  </Typography>
                )}
              </List>
            </Box>
          </Grid>

          {/* Name, Chart, and Score History */}
          <Grid container item xs={12} sm={9} md={9} lg={9} spacing={1}>
            {/* Name and Average Score */}
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
                <Typography variant="h1" sx={{ fontSize: { xs: 14, sm: 20, md: 20, lg: 30 }, fontWeight: "bold", mt: 2 }}>
                  {selectedMember ? `${selectedMember.first_name} ${selectedMember.last_name}` : "Loading..."}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, fontWeight: "bold", marginTop: 1 }}>
                  Average Score: {averageScore}%
                </Typography>
              </Box>
            </Grid>

            {/* Performance Chart and Score History */}
            <Grid container item xs={12} sm={12} md={9} lg={9}>
              {/* Dynamic Performance Chart */}
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Box sx={{ display: "flex", width: { xs: "80vw", sm: "55vw", md: "50vw", lg: "650px" } }}>
                  <MembersPerformanceChart memberData={scores} />
                </Box>
              </Grid>
              
              <Grid item xs={5} sm={5} md={7} lg={4}>
                {/* Highest and Lowest Scores Table */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    ml: { xs: "5vw", sm: "-10vw", md: "0px", lg: "0px" },
                  }}
                >
                  <ScoreHistory memberData={scores} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2} alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{ p: 8 }}>
                <Typography sx={{ textAlign: "center", fontSize: { xs: 14, sm: 16, nd: 20 } }}>
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

export default Performance;
