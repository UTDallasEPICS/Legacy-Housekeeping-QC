import React, { useEffect } from "react";
import { useState } from "react";
import formRoomValidation from "../componentsForAddRoom/formRoomValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert, Grid } from "@mui/material";
import Link from "next/link";
import { setRoom } from "../../../../slices/roomSelectSlice";
import { Route, Routes, useNavigate } from 'react-router-dom';
/*
function RedirectReactRouterExample() {
  return (
    <Routes>
      <Route path="/admin/roomPages/roomView" element={<About />} />
    </Routes>
  );
}
*/
const formEditRoom = () => {
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [building, setBuilding] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [type, setType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState(0);
  const [buildId, setbuildId] = useState("");

  //validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formRoomValidation(
      building,
      type,
      roomNum,
      floor
    );

    if (resCheck) {
      setError(resCheck);
      return;
    }
    if (confirm("Are you sure you would like to edit this room?") == true) {
      //Sending data to the api
      const res = await fetch("/api/room/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id : roomId,
          room_number: roomNum,
          building_number: building,
          room_name: roomName,
          floor_num: floor,
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
      setRoomId("")
      setBuilding(building);
      setRoomNum("");
      setType("");
      setRoomName("");
      setFloor(0);
      window.location.replace("/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(String(floor)).concat("&building_id=").concat(buildId));
    };
  };
  const handleDelete = async () => {
    if (confirm("Are you sure you would like to delete this room?") == true) {
      const res = await fetch("/api/room/deleteRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id : roomId,
        }),
      });
  
      if (!res.ok) {
        const r = await res.json();
        setError(r.error);
        return;
      }
      setRoomId("")
      setBuilding(building);
      setRoomNum("");
      setType("");
      setRoomName("");
      setFloor(0);
      //window.location.href = "/admin/roomPages/roomView";
      window.location.replace("/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(String(floor)).concat("&building_id=").concat(buildId));
    }

  };
  //Actual form
  const build = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  const room = useSelector(
    (state: RootState) => state.roomSelect.room
  );

    
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setRoomName(room["room_name"]);
    setBuilding(room["building_number"]);
    setRoomId(room["room_id"]);
    setRoomNum(room["room_num"]);
    setFloor(room["floor_num"]);
    setRoomNum(room["room_number"]);
    setType(room["type_of_room"]);
    setbuildId(room["building_id"]);
    var mySelect = document.getElementById('selector');

    for(var i=0; i<6; i++){
      var option = mySelect[i];
      if (room["type_of_room"] == option.value){
        option.selected = true;
        break;
      }
    }
      
  },[]);

  return (
    <>
    <div>
        <BackButton pageToGoBack={"/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(String(floor)).concat("&building_id=").concat(buildId)} />
    </div>
    <Grid container spacing = {1}
          direction = "column"
          justifyContent="center"
          alignItems="center">
      

      <Grid
        item xs = {12} md = {9} lg = {6} xl = {3}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx = {{justifyContent:"center", textAlign:"center"}}>
        <h1>Edit Room Form</h1>
      </Grid>

      <Grid style={{ display: "flex", justifyContent: "center" }}
            justifyContent="center"
            alignItems="center"
            item xs = {12} md = {9} lg = {6} xl = {3}
            sx = {{justifyContent:"center", textAlign:"center"}}>
        <h2>Building {building}</h2>
      </Grid>

      <Grid style={{ display: "flex", justifyContent: "center" }}
            item xs = {12} md = {9} lg = {6} xl = {3}
            sx = {{justifyContent:"center", textAlign:"center"}}>
        <h2>Please fill out the information of the room:</h2>
      </Grid>

      {/*This area will be the section where admin fills out info*/}
      <Grid
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx = {{justifyContent:"center", alignItems:"center"}}
            item xs = {12} md = {9} lg = {6} xl = {3}>
          {/* Room type */}
          <Grid 
            item xs = {12} md = {9} lg = {6} xl = {3}
            alignItems="center"
            sx = {{justifyContent:"center", textAlign:"center"}}>
            <label
            style={{
              fontSize: 25,
            }}
          >
            Type of Room:
            </label>
          </Grid>
          {/*Bug would be they start off with select, choose something, then go back to select and would allow */}
          <Grid
             item xs = {12} md = {9} lg = {6} xl = {3}
             alignItems="center"
             sx = {{justifyContent:"center", textAlign:"center"}}
          >
            <select
            id = 'selector'
            style={{ fontSize: 25 }}
            onChange={(e) => setType(e.target.value)}>
            <option value="selectType">
              Select
            </option>
            <option value="bathroom">Bathroom</option>
            <option value="auxiliary">Auxiliary</option>
            <option value="independent">Independent Living</option>
            <option value="assisted">Assisted Living</option>
            <option value="memory">Memory Care</option>
            <option value="skilled">Skilled Nursing</option>
            </select>
          </Grid>
          {/* Set the name of the room*/}
          <Grid sx={{ marginTop: 1 }}> {/*Grid these*/}
            <Grid
             item xs = {12} md = {9} lg = {6} xl = {3}
             alignItems="center"
             sx = {{justifyContent:"center", textAlign:"center"}}
          >
            <label
              style={{
                fontSize: 25,
                marginRight: 10,
              }}
            >
              Room Name:
            </label>
            </Grid>
            {/**/}
            <Grid
             item xs = {12} md = {9} lg = {6} xl = {3}
             alignItems="center"
             sx = {{justifyContent:"center", textAlign:"center"}}
            >
              <input
                onChange={(e) => setRoomName(e.target.value)}
                value={roomName}
                name="roomName"
                style={{ fontSize: 25, width: 300, height: 32, textAlign:"center" }}
              />
            </Grid>
          </Grid>

          {/* Room Number Input */}
          <Grid sx={{ marginTop: 1 }}>
            <Grid
              item xs = {12} md = {9} lg = {6} xl = {3}
              alignItems="center"
              sx = {{justifyContent:"center", textAlign:"center"}}>

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
              style={{ fontSize: 25, width: 100, height: 32, textAlign:"center" }}
            />

            </Grid>
          </Grid>

          {/*For floor number*/}
          <Grid sx={{ marginTop: 1 }}>
            <Grid
            item xs = {12} md = {9} lg = {6} xl = {3}
            alignItems="center"
            sx = {{justifyContent:"center", textAlign:"center"}}>
              <label
                style={{
                  fontSize: 25,
                  marginRight: 10,
                }}
              >
                Floor Number:
              </label>

              {/**/}
              <input
                onChange={(e) => setFloor(Number(e.target.value))}
                value={floor}
                name="floor"
                style={{ fontSize: 25, width: 50, height: 32, textAlign:"center" }}
              />
            </Grid>
          </Grid>

          {/* Use to be floor but changed to building*/}
          <Grid sx={{ marginTop: 1 }}>
            <Grid
              item xs = {12} md = {9} lg = {6} xl = {3}
              alignItems="center"
              sx = {{justifyContent:"center", textAlign:"center"}}>
                <label
                  style={{
                    fontSize: 25,
                    marginRight: 10,
                  }}
                >
                  Building:
                </label>

                {/*For building*/}
                <input
                  onChange={(e) => setBuilding(e.target.value)}
                  value={building}
                  name="building"
                  style={{ fontSize: 25, width: 50, height: 32, textAlign:"center" }}
                />
            </Grid>
          </Grid>
      </Grid>

      <Grid style={{ display: "flex", justifyContent: "center", marginTop: 70 }}>
        <Button
          variant="outlined"
          sx={{ border: 5 }}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ border: 5 }}
          onClick={() => handleDelete()}
        >
          Delete Room
        </Button>
      </Grid>

      {error && <Alert severity="error">{error}</Alert>}
    </Grid>
    </>
  );
};

export default formEditRoom;
<Link href="/admin/roomPages/roomView" passHref></Link>;
