import React from "react";
import BackButton from "../../../src/components/backButton";
import { Box, TextField } from "@mui/material";

const newRoomForm = () => {
  return (
    <>
      <div>
        <BackButton pageToGoBack={"/roomPages/roomView"} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>New Room Form</h1>
      </div>

      <div>
        <Box>
          <TextField></TextField>
        </Box>
      </div>
    </>
  );
};

export default newRoomForm;
