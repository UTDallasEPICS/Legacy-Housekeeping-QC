import { Box, Typography } from "@mui/material";

const dashboardCardHeading = (props: { text: string }) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "primary.contrastText",
          fontWeight: "bold",
        }}
      >
        {props.text}
      </Typography>
    </Box>
  );
};

export default dashboardCardHeading;
