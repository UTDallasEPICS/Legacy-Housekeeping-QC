import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import formRoomValidation from "../componentsForAddRoom/formRoomValidation";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert, Select, SelectChangeEvent, InputLabel, MenuItem, Grid, TextField } from "@mui/material";
import Link from "next/link";

const formEditRoom = () => {
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [building, setBuilding] = useState("");
  const [type, setType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState("");
  const [buildId, setbuildId] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  let gobacklink = "/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(floor);
  //validates what info they are submitting
  const handleSubmit = async () => {

    const resCheck = formRoomValidation(
      building,
      type,
      roomName,
      floor
    );
    setFormErrors(resCheck);
    if (resCheck!=0) {
      //setError(resCheck);
      return;
    }

    //Sending data to the api
    const res = await fetch("/api/room/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: roomId,
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
    setType("");
    setRoomName("");
    setFloor("");
    window.location.replace("/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(floor).concat("&building_id=").concat(buildId));
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
      setType("");
      setRoomName("");
      setFloor("");
      //window.location.href = "/admin/roomPages/roomView";
      window.location.replace("/admin/roomPages/roomView?building=".concat(building).concat("&floor=").concat(floor).concat("&building_id=").concat(buildId));
    }

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
    setRoomName(room["name"]);
    setRoomId(room["id"]);
    setFloor(room["floor_num"]);
    setType(room["type"]);
    setbuildId(room["building_id"]);
    var mySelect = document.getElementById('selector');

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
          <h1>Edit Room</h1>
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
            
            <Grid>
              <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
              <Select
                id = "selector"
                style={{ fontSize: "2.5vh", width: "30vh", height: "8vh",}}
                onChange={handleTypeChange}
                label={"Room Type"}
                value={type}
                autoWidth
              >
                <MenuItem value="personal">Personal Room</MenuItem>
                <MenuItem value="common">Common Area</MenuItem>
              </Select>
              {formErrors["type"] && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["type"]}</Alert>
            )}
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
              {formErrors["name"] && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["name"]}</Alert>
            )}
            </Grid>
        </Grid>
        
        {error && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{error}</Alert>}
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
        
      </Grid>
    </>
  );
};

export default formEditRoom;
<Link href="/admin/roomPages/roomView" passHref></Link>;
