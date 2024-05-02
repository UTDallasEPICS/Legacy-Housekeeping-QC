import { AppBar, CssBaseline, Typography } from "@mui/material";
import React from "react";
import { montserrat } from "../../../theme";

const buildingSelection = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" sx={{p: 2,  backgroundColor: "white"}}>
        <Typography variant="h3" align="center" color="primary" sx={{ fontFamily: montserrat.style.fontFamily }}>
          Building Selection
        </Typography>
      </AppBar>
    </>
  );
};

export default buildingSelection;
