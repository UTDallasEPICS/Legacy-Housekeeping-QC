import { Button,Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Link from "next/link";
const DownloadButton = () => {
  return (
    <Link href="/individual_performance">
      <Button
        variant="outlined"
        sx={{
          
          backgroundColor: "#FFFFFF",
          minWidth: "180px", 
          maxWidth: "12vw",
          height: "50px",
          borderRadius: "10px",
          border: "solid",
          borderColor: "#141c3b",
          display: "flex",
          justifyContent: "center",
          textDecoration: "none !important",
          marginTop: 2,
          
        }}
        endIcon={<ArrowDownwardIcon />}
      >
        <Typography sx={{ fontSize: { xs: 12, sm: 16, nd: 20 }, fontWeight: "bold" }}>
        One Month Scores
        </Typography>
      </Button>
    </Link>
  );
};

export default DownloadButton;
