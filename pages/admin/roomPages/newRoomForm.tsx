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

      {/*This area will be the section where admin fills out info*/}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form>
          <label
            style={{
              fontSize: 25,
              marginRight: 10,
            }}
          >
            Type of Room:
          </label>

          <select style={{ fontSize: 25 }}>
            <option selected value="bathroom">
              Bathroom
            </option>
            <option value="auxiliary">Auxiliary</option>
            <option value="independent">Independent Living</option>
            <option value="assited">Assisted Living</option>
            <option value="memory">Memory Care</option>
            <option value="skilled">Skilled Nursing</option>
          </select>

          <div style={{ marginTop: 20 }}>
            <label
              style={{
                fontSize: 25,
                marginRight: 10,
              }}
            >
              Floor:
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default newRoomForm;
