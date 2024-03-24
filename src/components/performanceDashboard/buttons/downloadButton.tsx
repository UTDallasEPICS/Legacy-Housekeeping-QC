import { Button,Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Link from "next/link";
const DownloadButton = () => { 
  return (
    // should be a dynamic link to member's performance 
    <Link href="/individual_performance"
      style={{ textDecoration: "none" }}
    >
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "white",
          minWidth: "180px", 
          maxWidth: "12vw",
          height: "60px",
          borderRadius: "10px",
          border: "2px solid",
          borderColor: "#141c3b",
          display: "flex",
          justifyContent: "center",
          textDecoration: "none !important",
          marginTop: 2,
          "&:hover": {            
            border: "solid",
            borderColor: "primary.main",
            color: "white",
            bgcolor: "primary.main", 
          },
        }}
        endIcon={<ArrowDownwardIcon />}
      >
        {/* 'download' button goes to one month scores */}
        <Typography sx={{ fontSize: { xs: 12, sm: 16, nd: 20 }, fontWeight: "bold" }}>
          One Month Scores
        </Typography> 
      </Button>
    </Link>
  );
};

export default DownloadButton;
