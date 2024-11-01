import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography, InputBase, List, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Navbar } from "../../src/components";
import MembersPerformanceChart from "../../src/components/performanceDashboard/charts/members_performanceChart";
import MemberButton from "../../src/components/performanceDashboard/buttons/memberButton";
import ScoreHistory from "../../src/components/performanceDashboard/scoreHistory";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTheme } from "@mui/material";

//*********************DYNAMIC PAGE****************************/
const Performance = ({ initialMembers }) => {
  // State variables
  const [members, setMembers] = useState(initialMembers);
  const [selectedMember, setSelectedMember] = useState(initialMembers[0] || null);
  const [scores, setScores] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const theme = useTheme();
  const pdfRef = useRef(null); // Reference for the area to capture

  const getMembers = async () => {
    try {
      const response = await fetch("/api/member/members", {
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

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchInput) ||
      member.last_name.toLowerCase().includes(searchInput)
  );

  useEffect(() => {
    if (selectedMember) {
      getScores(selectedMember);
    }
  }, [selectedMember]);

  useEffect(() => {
    const memberScores = scores.map((data) => data.amount);
    const averageScore = memberScores.reduce((total, score) => total + score, 0) / memberScores.length;
    setAverageScore(Math.round(averageScore));
    console.log("Scores:", scores);
  }, [scores]);

  // Function to generate PDF
  const generatePDF = () => {
    const input = pdfRef.current; // Refers to the area you want to print
    const logoUrl = 'https://i.postimg.cc/ZRH6ydCT/9489522-logo.png';

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const contentWidth = pdfWidth - 20; // Reduced margins for the content
      const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

      // Define the company's color for the margins (adjust as per the company’s branding)
      const marginColor = theme.palette.primary.main; // Example color, replace with the actual color code

      // Add a top margin with the company's color
      pdf.setFillColor(marginColor);
      pdf.rect(0, 0, pdfWidth, 20, 'F'); // Top margin height is 20 units

      // Add a bottom margin with the company's color
      pdf.rect(0, pdfHeight - 20, pdfWidth, 20, 'F'); // Bottom margin height is 20 units

      // Add the logo at the top left
      const logoWidth = 69; // Adjust size to fit within the layout
      const logoHeight = 40; // Maintain aspect ratio
      pdf.addImage(logoUrl, "PNG", 65, 14, logoWidth, logoHeight); // Position logo at the top left corner

      // Center the main content image (captured area) within the PDF
      const xOffset = (pdfWidth - contentWidth) / 2 + 14; // Center horizontally
      pdf.addImage(imgData, "PNG", xOffset, 60, contentWidth, contentHeight);

      // Add the footer text at the bottom of the PDF within the colored margin
      pdf.setFontSize(7);
      pdf.setTextColor(255, 255, 255); // White text color for contrast against the dark margin
      const footerText = "© 2024 The Legacy Senior Communities";
      pdf.text(footerText, 10, pdfHeight - 10);

      pdf.save("member_performance.pdf");
    });

  };


  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={3} sm={3} md={3} lg={3}>
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

          {/* Main content and score history to be captured */}
          <Grid container item xs={12} sm={9} md={9} lg={9} spacing={1} ref={pdfRef}>
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

            <Grid container item xs={12} sm={12} md={9} lg={9}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Box sx={{ display: "flex", width: { xs: "80vw", sm: "55vw", md: "50vw", lg: "650px" } }}>
                  <MembersPerformanceChart memberData={scores} />
                </Box>
              </Grid>

              <Grid item xs={5} sm={5} md={7} lg={4}>
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

          {/* PDF Download Button */}
          <Grid container item xs={12} alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{ p: 8, textAlign: "center" }}>
                <Button variant="contained" color="primary" onClick={generatePDF}>
                  Download PDF
                </Button>
              </Box>
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

export const getServerSideProps = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/member/members", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    const initialMembers = await response.json();
    return { props: { initialMembers } };
  } catch (error) {
    console.error("Error fetching members:", error);
    return { props: { initialMembers: [] } };
  }
};

export default Performance;