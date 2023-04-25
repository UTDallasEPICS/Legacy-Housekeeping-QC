import React from "react";
import { useState } from "react";
import formRoomValidation from "./formRoomValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert } from "@mui/material";
import Link from "next/link";

const formAddRoom = () => {
  const [error, setError] = useState(null);
  const [building, setBuilding] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [type, setType] = useState("");

  //validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formRoomValidation(building, type, roomNum);

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
        building_number: building,
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
    console.log("Good");
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
          {/*Bug would be they start off with select, choose something, then go back to select and would allow */}
          <select
            style={{ fontSize: 25 }}
            onChange={(e) => setType(e.target.value)}
          >
            <option selected value="selectType">
              Select
            </option>
            <option value="bathroom">Bathroom</option>
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
              onChange={(e) => setRoomNum(e.target.value)}
              value={roomNum}
              name="RoomNumber"
              style={{ fontSize: 25, width: 100, height: 32 }}
            />
          </div>

          {/* Use to be floor but changed to building*/}
          <div style={{ marginTop: 20 }}>
            <label
              style={{
                fontSize: 25,
                marginRight: 10,
              }}
            >
              Building:
            </label>

            {/**/}
            <input
              onChange={(e) => setBuilding(e.target.value)}
              value={building}
              name="building"
              style={{ fontSize: 25, width: 50, height: 32 }}
            />
          </div>
        </form>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 70 }}>
        <Button
          variant="outlined"
          sx={{ border: 5 }}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>

      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default formAddRoom;
<Link href="/admin/roomPages/roomView" passHref></Link>;
