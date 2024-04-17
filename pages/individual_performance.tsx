import { Navbar } from "../src/components";
import { Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";


const individual_performance = () => {
  // placeholder data
  const performanceData = [
    { date: "07/21/22", averageScore: 93 },
    { date: "07/24/22", averageScore: 95 },
    { date: "07/29/22", averageScore: 91 },
    { date: "08/03/22", averageScore: 89 },
    { date: "08/09/22", averageScore: 94 },
    { date: "08/20/22", averageScore: 100 },
  ];

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginLeft: { xs:"5vw", md: "25vw", lg: "25vw" },
        
        }}
      >
        <Link href="/members_performance"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "white",
              height: "50px",
              minWidth: "10vw",
              marginTop: "10px",
              borderRadius: "10px",
              border: "2px solid",
              borderColor: "primary",
              display: "flex",
              fontWeight: "bold",
              "&:hover": {            
                border: "solid",
                borderColor: "primary.main",
                color: "white",
                bgcolor: "primary.main", 
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
        </Link>
      </Box>

      <div style={{ textAlign: "center" }}>
        <h1>{`Team Member 1`}</h1>
        <h3>07/21/22 - 08/21/22</h3>
      </div>
      <table style={{ border: "1px solid black", margin: "0 auto" }}>
        <tbody>
        {performanceData.map((entry, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{entry.date}</td>
              <td style={{ textAlign: "center" }}>Average: {entry.averageScore}%</td>
              <td style={{ textAlign: "center" }}>
                <Link href="/report_performance"> {/* should be dynamic link */}
                  <a>View Report</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default individual_performance;
