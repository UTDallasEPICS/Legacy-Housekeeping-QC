import React from "react";
import BackButton from "../../../src/components/backButton";
import { Box, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const newRoomForm = () => {
  const building = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  return (
    <>
      <div>
        <BackButton pageToGoBack={"/admin/roomPages/roomView"} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>New Room Form</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Building {building}</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Please fill out the information of the room:</h2>
      </div>

      {/*This area will be the section where admin fills out info*/}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form>
          {/* Room type */}
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

          {/* Room Number Input */}
          <div style={{ marginTop: 20 }}>
            <label
              style={{
                fontSize: 25,
                marginRight: 10,
              }}
            >
              Room Number:
            </label>

            <input
              name="RoomNumber"
              style={{ fontSize: 25, width: 100, height: 32 }}
            />
          </div>

          {/* Floor Input */}
          <div style={{ marginTop: 20 }}>
            <label
              style={{
                fontSize: 25,
                marginRight: 10,
              }}
            >
              Floor:
            </label>

            <input
              name="floorNum"
              style={{ fontSize: 25, width: 50, height: 32 }}
            />
          </div>
        </form>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 70 }}>
        <Button variant="outlined" sx={{ border: 5 }}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default newRoomForm;
