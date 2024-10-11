import { AppBar, CssBaseline, Typography, Grid } from "@mui/material";
import React from "react";
import { montserrat } from "../../../theme";
import { BackButton } from "../../../../src/components";

const floorSelection = () => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          p: 3,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <BackButton pageToGoBack={"buildingChoice"} />
        <Grid item style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Typography
            variant="h3"
            align="center"
            color="primary"
            sx={{ fontFamily: montserrat.style.fontFamily, flex: 1, whiteSpace: "nowrap" }}
          >
            Floor Selection
          </Typography>
        </Grid>
      </AppBar>
    </>
  );
};

export default floorSelection;
