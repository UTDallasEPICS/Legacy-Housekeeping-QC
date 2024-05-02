import { Box, Typography } from "@mui/material";
import { montserrat } from "../../../pages/theme";

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
          color: "white",
          fontWeight: "bold",
          fontFamily: montserrat.style.fontFamily,
        }}
      >
        {props.text}
      </Typography>
    </Box>
  );
};

export default dashboardCardHeading;
