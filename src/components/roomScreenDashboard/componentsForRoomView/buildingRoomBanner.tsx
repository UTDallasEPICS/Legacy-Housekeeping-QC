import { AppBar, CssBaseline, Typography } from "@mui/material";
import React from "react";
//Hopefull this can be updated with the actual room data

const buildingRoomBanner = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Typography variant="h3" align="center">
          Welcome to Building ""
        </Typography>
      </AppBar>
    </>
  );
};

export default buildingRoomBanner;
