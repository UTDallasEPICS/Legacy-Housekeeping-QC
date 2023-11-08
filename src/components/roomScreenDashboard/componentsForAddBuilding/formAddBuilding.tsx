import React from "react";
import { useState } from "react";
//import formRoomValidation from "./formRoomValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert, TextField, Grid } from "@mui/material";
import Link from "next/link";

const formAddRoom = () => {
  const [error, setError] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [floorsAmount, setFloorsAmount] = useState(0);

  //validates what info they are submitting
  const handleSubmit = async () => {
    // const resCheck = formRoomValidation(
    //   building,
    //   type,
    //   roomNum,
    //   roomName,
    //   floor
    // );

    // if (resCheck) {
    //   setError(resCheck);
    //   return;
    // }

    //Sending data to the api
    if (confirm("Are you sure you would like to create this building?") == true) {
      const res = await fetch("/api/room/addbuilding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          building_name:buildingName,
          floors_amount:floorsAmount
        }),
      });

      if (!res.ok) {
        const r = await res.json();
        setError(r.error);
        return;
      }
      window.location.replace("/admin/roomPages/buildingChoice");
    }
  };

  //Actual form

  return (
    <>
      <div>
          <BackButton pageToGoBack={"/admin/roomPages/buildingChoice"} />
      </div>

      <Grid container spacing = {1}
          direction="column"
          justifyContent="center"
          alignItems="center">
      

      <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}
      sx={{textAlign:"center"}}>
        <h1>Add a new building</h1>
      </Grid>

      <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12} 
      sx={{textAlign:"center"}}>
        <h2>Please fill out the information of the building:</h2>
      </Grid>

      {/*This area will be the section where admin fills out info*/}
          {/* Set the name of the room*/}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  alignItems={"center"}>
            <label
              style={{
                fontSize: "3vh",
                marginRight: 10,
                textAlign: "center",
              }}
            >
              Building Name:
            </label>
          </Grid>  

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  alignItems={"center"}>
            <TextField
              label="Building Name" 
              variant="outlined"
              onChange={(e) => setBuildingName(e.target.value)}
              value={buildingName}
              name="roomName"
              style={{ fontSize: "25vh", width: "30vh", height: "10vh", justifyContent:"center", }}
            />
          </Grid>
          

          {/* Room Number Input */}
          <Grid style={{ }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <label
              style={{
                fontSize: "3vh",
                marginRight: 10,
                textAlign: "center",
              }}
            >
              Amount of Floors:
            </label>
          </Grid>
          <Grid style={{ }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              onChange={(e) => setFloorsAmount(Number(e.target.value))}
              label="# of Floors"
              value={floorsAmount}
              name="RoomNumber"
              style={{ fontSize: "25vh", width: "30vh", height: "10vh", justifyContent:"center", }}
            />
          </Grid>

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
    </Grid>
    </>
    
  );
};

export default formAddRoom;
<Link href="/admin/roomPages/roomView" passHref></Link>;
