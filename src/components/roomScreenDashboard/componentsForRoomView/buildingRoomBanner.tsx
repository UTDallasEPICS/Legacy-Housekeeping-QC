import { AppBar, CssBaseline, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

//Hopefull this can be updated with the actual room data

const buildingRoomBanner = ({buildingVal=""}) => {
  //Gets the state that stores what building we selected
  
  
  const building = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  let finalval = building;
  if(buildingVal!=""){
    finalval = buildingVal;
  }
  
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Typography variant="h3" align="center">
          Welcome to Building - {finalval}
        </Typography>
      </AppBar>
    </>
  );
};

export default buildingRoomBanner;
