import { AppBar, CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { montserrat } from "../../../theme";
import { BackButton } from "../../../../src/components";

const buildingRoomBanner = ({ buildingVal = "" }) => {
  //Gets the state that stores what building we selected

  const building = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  let finalval = building;
  if (buildingVal != "") {
    finalval = buildingVal;
  }

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
        <BackButton pageToGoBack={`/admin/roomPages/floorChoice?building=${finalval}`} />
        <Grid item style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Typography
            variant="h3"
            align="center"
            color="primary"
            sx={{ flex: 1, fontFamily: montserrat.style.fontFamily }}
          >
            Welcome to Building - {finalval}
          </Typography>
        </Grid>
      </AppBar>
    </>
  );
};

export default buildingRoomBanner;
