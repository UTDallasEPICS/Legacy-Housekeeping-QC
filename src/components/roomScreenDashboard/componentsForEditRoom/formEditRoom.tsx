import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert, Select, SelectChangeEvent, InputLabel, MenuItem, Grid, TextField } from "@mui/material";
import Link from "next/link";

const formEditRoom = () => {
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [building, setBuilding] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [type, setType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState("");
  const [buildId, setbuildId] = useState("");

  let gobacklink = "/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(floor);
  //validates what info they are submitting
  const handleSubmit = async () => {

    //Sending data to the api
    const res = await fetch("/api/room/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_number: roomNum,
        building_number: building,
        building_id:buildId,
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

    setBuilding(building);
    setRoomNum("");
    setType("");
    setRoomName("");
    setFloor("");
    window.location.replace("/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(floor).concat("&building_id=").concat(buildId));
  };

  //Actual form
  const build = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  const room = useSelector(
    (state: RootState) => state.roomSelect.room
  );

  let buildingParam;
  let floorParam;
  let idParam;
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
      console.log(option)
      if (room["type_of_room"] == option.getAttribute("value")){
        option.selected = true;
        break;
      }
    }
  },[]);

  const handleTypeChange = (event : SelectChangeEvent) => {
    setType(event.target.value)
  }

  return (
    <>
      <div>
        <BackButton pageToGoBack={"/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(floor).concat("&building_id=").concat(buildId)} />
      </div>
      <Grid container
      direction={"column"}
      alignItems={"center"}>
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <h1>New Room Form</h1>
        </Grid>

        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{textAlign:"center"}}>Building: {building} <br></br>Floor {floor}</h2>
          
        </Grid>

        <Grid style={{ display: "flex", justifyContent: "center", textAlign:"center" }}>
          <h2>Please fill out the information of the room:</h2>
        </Grid>

        {/*This area will be the section where admin fills out info*/}
        <Grid alignContent={"center"} direction={"column"} sx={{textAlign:"center"}}>
            {/* Room type */}
            <Grid>
              <label
                style={{
                  fontSize: "5vh",
                  marginRight: 10,
                }}
              >
                Type of Room:
              </label>
            </Grid>
            
            {/*Bug would be they start off with select, choose something, then go back to select and would allow */}
            <Grid>
              <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
              <Select
                id = "selector"
                style={{ fontSize: "5vh", width: "30vh", height: "8vh", textAlign:"center" }}
                onChange={handleTypeChange}
                label={"Room Type"}
                value={type}
                autoWidth
              >
                <MenuItem value="selectType">
                  Select
                </MenuItem>
                <MenuItem value="bathroom">Bathroom</MenuItem>
                <MenuItem value="auxiliary">Auxiliary</MenuItem>
                <MenuItem value="independent">Independent Living</MenuItem>
                <MenuItem value="assisted">Assisted Living</MenuItem>
                <MenuItem value="memory">Memory Care</MenuItem>
                <MenuItem value="skilled">Skilled Nursing</MenuItem>
              </Select>
            </Grid>
            

            {/* Set the name of the room*/}
            <Grid style={{ marginTop: 20 }}>
              <label
                style={{
                  fontSize: 25,
                  marginRight: 10,
                }}
              >
                Room Name:
              </label>
            </Grid>
            <Grid style={{ marginTop: 20 }}>
              {/**/}
              <TextField
                label="Room Name" 
                variant="outlined"
                onChange={(e) => setRoomName(e.target.value)}
                value={roomName}
                name="roomName"
                style={{ fontSize: "5vh", width: "30vh", height: "15vh", textAlign:"center" }}
              />
            </Grid>

            {/* Room Number Input */}
            <Grid style={{ marginTop: 20 }}>
              <label
                style={{
                  fontSize: 25,
                  marginRight: 10,
                }}
              >
                Room Number:
              </label>
            </Grid>
            <Grid style={{ marginTop: 20 }}>
              <TextField
                label="Room Number" 
                variant="outlined"
                onChange={(e) => setRoomNum(e.target.value)}
                value={roomNum}
                name="RoomNumber"
                style={{ fontSize: "5vh", width: "30vh", height: "15vh", textAlign:"center" }}
              />
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
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default formEditRoom;
<Link href="/admin/roomPages/roomView" passHref></Link>;
