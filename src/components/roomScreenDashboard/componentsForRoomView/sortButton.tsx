import { Button } from "@mui/material";
import React from "react";

const sortButton = () => {
  return (
    <>
      <select style={{ fontSize: 25 }}>
        <option selected value="">
          Sort By
        </option>
        <option value="bathroom">Bathroom</option>
        <option value="auxiliary">Auxiliary</option>
        <option value="independent">Independent Living</option>
        <option value="assited">Assisted Living</option>
        <option value="memory">Memory Care</option>
        <option value="skilled">Skilled Nursing</option>
      </select>
    </>
  );
};

export default sortButton;

/*

      <Button variant="outlined" sx={{ border: 3 }}>
        Sort by ↓
      </Button>
      */
