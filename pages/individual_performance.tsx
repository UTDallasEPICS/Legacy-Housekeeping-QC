import { Navbar } from "../src/components";
import { Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";


const individual_performance = () => {
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
        <Link href="/members_performance">
          <Button
            variant="outlined"
            sx={{
              fontWeight: "bold",
              backgroundColor: "#FFFFFF",
              height: "50px",
              minWidth: "10vw",
              borderRadius: "10px",
              border: "solid",
              borderColor: "#141c3b",
              display: "flex",
              marginTop: "10px",
              
              
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
          <tr>
            <td style={{ textAlign: "center" }}>07/21/22</td>
            <td style={{ textAlign: "center" }}>Avg: 93%</td>
            <td style={{ textAlign: "center" }}>
              <a href="/report_performance">View Report</a>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>07/24/22</td>
            <td style={{ textAlign: "center" }}>Avg: 95%</td>
            <td style={{ textAlign: "center" }}>
              <a href="/report_performance">View Report</a>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>07/29/22</td>
            <td style={{ textAlign: "center" }}>Avg: 91%</td>
            <td style={{ textAlign: "center" }}>
              <a href="/report_performance">View Report</a>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>08/03/22</td>
            <td style={{ textAlign: "center" }}>Avg: 89%</td>
            <td style={{ textAlign: "center" }}>
              <a href="/report_performance">View Report</a>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>08/09/22</td>
            <td style={{ textAlign: "center" }}>Avg: 94%</td>
            <td style={{ textAlign: "center" }}>
              <a href="/report_performance">View Report</a>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>08/20/22</td>
            <td style={{ textAlign: "center" }}>Avg: 100%</td>
            <td style={{ textAlign: "center" }}>
              <a href="/report_performance">View Report</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default individual_performance;
