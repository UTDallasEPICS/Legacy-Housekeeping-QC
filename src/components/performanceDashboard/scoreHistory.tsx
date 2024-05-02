import { Box, Typography } from "@mui/material";

const ScoreHistory = ({ memberData }) => {
  const sortedMemberData = [...memberData].sort((a, b) => b.amount - a.amount);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        textAlign: "center",
        marginLeft: "30px",
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

      {/* Top 3 scores table */}
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
      {sortedMemberData.slice(0,3).map((data) => (
        <Typography
          key={data.id}
          variant="body1"
          sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
          gutterBottom
        >
          {`${new Date(data.timestamp).toDateString()}: ${data.amount}`}
        </Typography>
      ))}

      {/* Lowest 3 scores table */}
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
      {sortedMemberData.slice(-3).map((data) => (
        <Typography
          key={data.id}
          variant="body1"
          sx={{ fontSize: { xs: 11, sm: 11, md: 13, lg: 16 } }}
          gutterBottom
        >
          {`${new Date(data.timestamp).toDateString()}: ${data.amount}`}
        </Typography>
      ))}
    </Box>
  );
};

export default ScoreHistory;
