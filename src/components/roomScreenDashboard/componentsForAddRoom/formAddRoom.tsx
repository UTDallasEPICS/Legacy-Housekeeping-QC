import React, { useEffect, useState } from "react";
import formRoomValidation from "./formRoomValidation";
import BackButton from "../../globalComponents/backButton";
import {
  Button,
  Alert,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import Link from "next/link";
import Navbar from "../../../../src/components/adminDashboard/navbar/navbar";
import { useRouter } from 'next/router';
import RoomViewBanner from "../../adminDashboard/Banner/Banner";
import Banner from "../../adminDashboard/Banner/Banner";

const formAddRoom = () => {
  const [error, setError] = useState(null);
  const [building, setBuilding] = useState("");
  const [roomNum, setRoomNum] = useState(0);
  const [type, setType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState(0);
  const [buildingId, setBuildingId] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  const router = useRouter();

  let goBackLink = `/admin/roomPages/roomView?building=${building}&floor=${floor}&building_id=${buildingId}`;

  // validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formRoomValidation(building, type, roomName, floor);

    setFormErrors(resCheck);
    if (resCheck != 0) {
      setError(resCheck);
      return;
    }

    // Sending data to the api
    const res = await fetch("/api/room/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        building_id: buildingId,
        room_name: roomName,
        floor_num: floor,
        type_of_room: type,
      }),
    });

    if (!res.ok) {
      const r = await res.json();
      setError(r.error);
      return;
    }

    setBuilding(building);
    setRoomNum(0);
    setType("");
    setFloor(floor);

    router.push(goBackLink);
  };

  // holds floor data from url to pass into the states
  let buildingParam;
  let floorParam;
  let idParam;

  // get floor data from url
  useEffect(() => {
    const queryString = router.asPath.split(/\?/)[1];
    const urlParams = new URLSearchParams(queryString);

    buildingParam = urlParams.get("building");
    floorParam = urlParams.get("floor");
    idParam = urlParams.get("building_id");

    setBuilding(buildingParam);
    setFloor(floorParam);
    setBuildingId(idParam);
  }, []);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <>
      <Navbar />

      <div>
        <Banner relativePath={goBackLink} function="Add New Room" />
      </div>


      <Grid container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
      >
        <br />

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <h2> Building: {building} </h2>
          <h2> Floor: {floor} </h2>
          <h2> Please fill out the information of the room: </h2>
        </Grid>

        {/* This area will be the section where user fills out info */}
        <Grid item>
          {/* Room type */}
          <InputLabel id="demo-simple-select-label" style={{ color: 'black', paddingLeft: 10 }}>Room Type</InputLabel>
          <Select
            style={{
              fontSize: "2.5vh",
              width: "30vh",
              height: "8vh",
              textAlign: "center",
              backgroundColor: "white",
            }}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <strong>-</strong>;
              }
              return selected === "common" ? "Common Room" : "Personal Room";
            }}
            onChange={handleTypeChange}
            value={type}
            autoWidth
          >
            <MenuItem value="common">Common Area</MenuItem>
            <MenuItem value="personal">Personal Room</MenuItem>
          </Select>
          {formErrors["type"] && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
              {formErrors["type"]}
            </Alert>
          )}
        </Grid>

        <Grid item>
          {/* Set the name of the room */}
          <TextField
            label="Room Name"
            variant="outlined"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            name="roomName"
            placeholder="Room Name"
            InputLabelProps={{
              style: { color: 'black' },
            }}
            sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
            color="secondary"
          />
          {formErrors["name"] && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
              {formErrors["name"]}
            </Alert>
          )}
        </Grid>

        <Grid item>
          {/* set the room number */}
          <TextField
            InputLabelProps={{
              style: { color: 'black' },
            }}
            sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
            color="secondary"
            type="number"
            label="Room Number"
            variant="outlined"
            onChange={(e) => setRoomNum(Number(e.target.value))}
            value={roomNum}
            name="RoomNumber"
          />
          {formErrors["number"] && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
              {formErrors["number"]}
            </Alert>
          )}
        </Grid>

        {/* submit button */}
        <Grid item>
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
        </Grid>
      </Grid>
    </>
  );
};

export default formAddRoom;
<Link href="/admin/roomPages/roomView" passHref></Link>;
