import React from "react";

const sortButton = () => {
  return (
    <>
      <select style={{ fontSize: 25 }}>
        <option selected value="">
          Sort By
        </option>
        <option value="personal">Personal Room</option>
        <option value="common">Common Area</option>
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
