import { Button } from "@mui/material";
import React from "react";

const sortButton = () => {
  return (
    <>
      <Button variant="outlined" sx={{ border: 3 }}>
        Sort by ↓
      </Button>
    </>
  );
};

export default sortButton;
