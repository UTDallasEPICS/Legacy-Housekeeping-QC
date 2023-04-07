import React from "react";
import { Button, CssBaseline } from "@mui/material";
import Link from "next/link";

//Button to click that allows a user to create a new room
const addRoomButton = () => {
  return (
    <>
      <CssBaseline />
      <Link href="/admin/roomPages/newRoomForm" passHref>
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
      </Link>
    </>
  );
};

export default addRoomButton;
