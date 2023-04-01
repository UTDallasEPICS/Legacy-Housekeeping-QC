import React from "react";
import { Button, CssBaseline } from "@mui/material";

//Button to click that allows a user to create a new room

const addRoomButton = () => {
  return (
    <>
      <CssBaseline />
      <Button
        style={{
          fontSize: 22,
          justifyContent: "center",
          height: 85,
          width: 160,
          margin: 10,
          display: "flex",
        }}
        sx={{ border: 5 }}
        variant="outlined"
      >
        Add Room
      </Button>
    </>
  );
};

export default addRoomButton;
