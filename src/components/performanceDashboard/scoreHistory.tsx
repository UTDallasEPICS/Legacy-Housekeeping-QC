import { Box, Typography } from "@mui/material";
import { memberData } from "../../../pages/members_performance";

const ScoreHistory = () => {





  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: 13, sm: 14, md: 16, lg: 20 },
        }}
        gutterBottom
      >
        Score History
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: 11, sm: 12, md: 14, lg: 17 },
        }}
        gutterBottom
      >
        Top 3 Scores:
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
        gutterBottom
      >
        08/21/23: 100
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
        gutterBottom
      >
        08/27/23: 89
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
        gutterBottom
      >
        08/06/23: 87
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: 11, sm: 12, md: 14, lg: 17 },
        }}
        gutterBottom
      >
        Lowest 3 Scores:
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
        gutterBottom
      >
        08/28/23: 79
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
        gutterBottom
      >
        08/01/23: 78
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
        gutterBottom
      >
        08/17/23: 69
      </Typography>
    </Box>
  );
};

export default ScoreHistory;
