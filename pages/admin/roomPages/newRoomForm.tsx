import React from "react";
import BackButton from "../../../src/components/backButton";
import { Box, TextField } from "@mui/material";

const newRoomForm = () => {
  return (
    <>
      <div>
        <BackButton pageToGoBack={"/admin/roomPages/roomView"} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>New Room Form</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Please fill out the information of the room:</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField></TextField>
      </div>
    </>
  );
};

export default newRoomForm;
