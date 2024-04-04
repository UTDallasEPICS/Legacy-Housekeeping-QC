import React from "react";
import { Button, CssBaseline } from "@mui/material";

//Button to click that allows a user to delete a current room

const deleteRoomButton = () => {
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
        }}
        sx={{ border: 5 }}
        variant="outlined"
      >
        Delete Room
      </Button>
    </>
  );
};

export default deleteRoomButton;
