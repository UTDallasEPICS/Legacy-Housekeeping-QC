import React from "react";
import { useState } from "react";
import formValidation from "../../teamMemberComponents/addMember/formValidation";
import formRoomValidation from "./formRoomValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import BackButton from "../../globalComponents/backButton";
import { Button } from "@mui/material";

const formAddRoom = () => {
  const [error, setError] = useState(null);
  const [building, setBuilding] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [type, setType] = useState("");

  //validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formRoomValidation(building, roomNum, type);

    if (resCheck) {
      setError(resCheck);
      return;
    }

    //Sending data to the api
    const res = await fetch("/api/room/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_number: roomNum,
        building_number: building, //will need to change to string
        is_clean: false,
        is_active: true,
        type_of_room: type,
      }),
    });

    if (!res.ok) {
      const r = await res.json();
      setError(r.error);
      return;
    }

    setBuilding("");
    setRoomNum("");
    setType("");
  };

  //Actual form
  const build = useSelector(
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
        <h2>Building {build}</h2>
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

export default formAddRoom;
