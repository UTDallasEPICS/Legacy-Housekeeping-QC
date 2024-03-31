import React, { useEffect, useState } from "react";
import formRoomValidation from "../componentsForAddRoom/formRoomValidation";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert, Select, SelectChangeEvent, InputLabel, MenuItem, Grid, TextField } from "@mui/material";
import Link from "next/link";
import Navbar from "../../../../src/components/adminDashboard/navbar/navbar";

const formEditRoom = () => {
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState(0);
  const [building, setBuilding] = useState("");
  const [type, setType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [formErrors, setFormErrors] = useState<any>({});

  let goBackLink = `/admin/roomPages/roomView?building=${building}&floor=${floor}&building_id=${buildingId}`;

  // validates what info they are submitting
  const handleSubmit = async () => {
    console.log("room name:", roomName);

    const resCheck = formRoomValidation(
      building,
      type,
      roomName,
      floor,
    );

    setFormErrors(resCheck);
    if (resCheck!=0) {
      //setError(resCheck);
      return;
    }

    // sending data to the api
    const res = await fetch("/api/room/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: roomId,
        building_id: buildingId,
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

    window.location.replace(goBackLink);
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

      setRoomId(0)
      setBuilding(building);
      setType("");
      setRoomName("");
      setFloor(0);
      window.location.replace(goBackLink);
    }

  };

  useEffect(() => {
    // get url parameters and initialize state variables
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const buildingIdParam = urlParams.get("buildingId");
    const floorParam = urlParams.get("floor");
    const roomIdParam = urlParams.get("roomId");

    setBuildingId(Number(buildingIdParam));
    setFloor(Number(floorParam));
    setRoomId(Number(roomIdParam));
  }, []);

  useEffect(() => {
    // get data when buildingId and floor are updated after previous useEffect
    getRoomData();
    getBuildingData();
  }, [buildingId, floor]);

  const getRoomData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/room/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buildingId: buildingId,
          floor: floor,
          roomId: roomId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await response.json();
      
      console.log("result:", json);
      setRoomName(json["name"]);
      setType(json["type"]);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const getBuildingData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/room/building", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buildingId: buildingId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await response.json();
      
      console.log("result:", json);
      setBuilding(json["name"]);
    } 
    catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  const handleTypeChange = (event : SelectChangeEvent) => {
    setType(event.target.value)
  }

  return (
    <>
      <Navbar/>
      <div>
        <BackButton pageToGoBack={goBackLink} />
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
        <Grid container alignContent={"center"} direction={"column"} sx={{textAlign:"center"}}>
            {/* Room type */}
            <Grid>
              <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
              <Select
                id = "selector"
                style={{ fontSize: "2.5vh", width: "30vh", height: "8vh",}}
                onChange={handleTypeChange}
                value={type}
                autoWidth
              >
                <MenuItem value="PERSONAL_ROOM">Personal Room</MenuItem>
                <MenuItem value="COMMON_AREA">Common Area</MenuItem>
              </Select>
              {formErrors["type"] && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["type"]}</Alert>
              )}
            </Grid>
            
            {/* Set the name of the room*/}
            <Grid style={{ marginTop: 20 }}>
              <TextField
                label="Room Name" 
                variant="outlined"
                onChange={(e) => setRoomName(e.target.value)}
                value={roomName}
                name="roomName"
                style={{ 
                  fontSize: "5vh", 
                  width: "30vh", 
                  height: "8vh", 
                  textAlign:"center" 
                }}
              />
              {formErrors["name"] && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["name"]}</Alert>
            )}
            </Grid>

            {/* Room Number Input CURRENTLY BUGGED*/}
            <Grid>
              <TextField
                label="Room Number" 
                variant="outlined"
                onChange={(e) => setRoomId(Number(e.target.value))}
                value={roomId}
                name="RoomNumber"
                style={{ fontSize: "5vh", width: "30vh", height: "8vh", textAlign:"center" }}
              />
              {formErrors["number"] && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["number"]}</Alert>
              )}
            </Grid>
            
        </Grid>
        
        {error && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{error}</Alert>}
        <Grid style={{ display: "flex", justifyContent: "center"}}>
          <Button
            variant="outlined"
            sx={{ 
              border: 3,
              marginRight: "1vh",
              "&:hover": {            
                border: 3,
                borderColor: "primary.main",
                color: "white",
                bgcolor: "primary.main", 
              }, 
            }}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            sx={{ 
              border: 3,
              "&:hover": {            
                border: 3,
                borderColor: "primary.main",
                color: "white",
                bgcolor: "primary.main", 
              }, 
            }}
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
