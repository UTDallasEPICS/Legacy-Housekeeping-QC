import React from "react";
import { Button, CssBaseline, Grid } from "@mui/material";
import Link from "next/link";

// Button to click that allows a user to create a new room
const addRoomButton = ({ buildingName, floorName, buildid }) => {
  return (
    <>
      <CssBaseline />
      <Link href={"/admin/roomPages/newRoomForm?building=".concat(buildingName).concat("&floor=").concat(floorName).concat("&building_id=").concat(buildid)} passHref
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          sx={{ 
            fontSize: 22,
            fontweight: "bold", 
            justifyContent: "center",
            height: 80,
            width: 170,
            display: "flex",
            textDecoration: "none",
            border: 3,
            borderColor: "secondary.main",
            color: "secondary.main",
            bgcolor: "white",
            "&:hover": {
              border: 3,
              borderColor: "secondary.main",
              color: "white",
              bgcolor: "secondary.main",
            },
          }}
        >
          Add Room
        </Button>
      </Link>
    </>
  );
};

export default addRoomButton;
