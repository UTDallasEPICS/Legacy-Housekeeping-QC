import React, { useEffect } from "react";
import { useState } from "react";
import formRoomValidation from "./formRoomValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
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

const formAddRoom = () => {
  const [error, setError] = useState(null);
  const [building, setBuilding] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [type, setType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState("");
  const [buildId, setBuildId] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});
  let gobacklink = "/admin/roomPages/roomView?building="
    .concat(building)
    .concat("&floor=")
    .concat(floor);
  //validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formRoomValidation(building, type, roomName, floor);
    setFormErrors(resCheck);
    if (resCheck != 0) {
      //setError(resCheck);
      return;
    }

    //Sending data to the api
    const rubricRes = await fetch("/api/rubric/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rubric_type: "Quantitative" }),
    });
    const rubric = await rubricRes.json();

    const res = await fetch("/api/room/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_number: roomNum,
        building_number: building,
        building_id: buildId,
        room_name: roomName,
        floor_num: floor,
        is_clean: false,
        is_active: true,
        type_of_room: type,
        rubric_id: rubric.id,
      }),
    });

    const itemsRes = await fetch("/api/roomItem/addDefault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: res.id,
        rubric_id: rubric.id,
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
    window.location.replace(
      "/admin/roomPages/roomView?building="
        .concat(building)
        .concat("&floor=")
        .concat(floor)
        .concat("&building_id=")
        .concat(buildId)
    );
  };

  //Actual form
  const build = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  let buildingParam;
  let floorParam;
  let idParam;
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    buildingParam = urlParams.get("building");
    floorParam = urlParams.get("floor");
    idParam = urlParams.get("building_id");

    setBuilding(buildingParam);
    setFloor(floorParam);
    setBuildId(idParam);
  }, []);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div>
        <BackButton
          pageToGoBack={"/admin/roomPages/roomView?building="
            .concat(building)
            .concat("&floor=")
            .concat(floor)
            .concat("&building_id=")
            .concat(buildId)}
        />
      </div>
      <Grid container direction={"column"} alignItems={"center"}>
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <h1>New Room Form</h1>
        </Grid>

        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ textAlign: "center" }}>
            Building: {building} <br></br>Floor {floor}
          </h2>
        </Grid>

        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2>Please fill out the information of the room:</h2>
        </Grid>

        {/*This area will be the section where admin fills out info*/}
        <Grid
          direction={"column"}
          alignContent={"center"}
          sx={{ textAlign: "center" }}
        >
          {/* Room type */}

          <Grid>
            <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
            <Select
              style={{
                fontSize: "2.5vh",
                width: "30vh",
                height: "8vh",
                textAlign: "center",
              }}
              onChange={handleTypeChange}
              value={type}
              autoWidth
            >
              <MenuItem value="bathroom">Bathroom</MenuItem>
              <MenuItem value="auxiliary">Auxiliary</MenuItem>
              <MenuItem value="independent">Independent Living</MenuItem>
              <MenuItem value="assisted">Assisted Living</MenuItem>
              <MenuItem value="memory">Memory Care</MenuItem>
              <MenuItem value="skilled">Skilled Nursing</MenuItem>
            </Select>
            {formErrors["type"] && (
              <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                {formErrors["type"]}
              </Alert>
            )}
          </Grid>

          {/* Set the name of the room*/}

          <Grid style={{ marginTop: 20 }}>
            <TextField
              style={{
                fontSize: "5vh",
                width: "30vh",
                height: "8vh",
                textAlign: "center",
              }}
              label="Room Name"
              variant="outlined"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
              name="roomName"
            />
            {formErrors["name"] && (
              <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                {formErrors["name"]}
              </Alert>
            )}
          </Grid>

          <Grid>
            <TextField
              style={{
                fontSize: "5vh",
                width: "30vh",
                height: "8vh",
                textAlign: "center",
                margin: 0,
              }}
              label="Room Number"
              variant="outlined"
              onChange={(e) => setRoomNum(e.target.value)}
              value={roomNum}
              name="RoomNumber"
            />
            {formErrors["number"] && (
              <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                {formErrors["number"]}
              </Alert>
            )}
          </Grid>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            sx={{
              border: 5,
              marginRight: "1vh",
              "&:hover": {
                border: 5,
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
