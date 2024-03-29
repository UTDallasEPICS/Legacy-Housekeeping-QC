import React from "react";
import { useState, useEffect } from "react";
import formBuildingValidation from "./formBuildingValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import BackButton from "../../globalComponents/backButton";
import { Button, Alert, TextField, Grid } from "@mui/material";
import Link from "next/link";
import Navbar from "../../../../src/components/adminDashboard/navbar/navbar";

const formAddBuilding = () => {
  const [error, setError] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [floorsAmount, setFloorsAmount] = useState(0);
  const [formErrors, setFormErrors] = useState<any>({});

  //validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formBuildingValidation(
      buildingName,
      floorsAmount,
    );

    setFormErrors(resCheck);
    if (resCheck!=0) {
      //setError(resCheck);
      return;
    }

    //Sending data to the api
    const res = await fetch("/api/room/addbuilding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        building_name: buildingName,
        floors_amount: floorsAmount
      }),
    });

    if (!res.ok) {
      const r = await res.json();
      setError(r.error);
      return;
    }
    window.location.replace("/admin/roomPages/buildingChoice");
    
  };

  //Actual form

  return (
    <div>
      <Navbar/>
      <div>
          <BackButton pageToGoBack={"/admin/roomPages/buildingChoice"} />
      </div>

    <Grid container 
      spacing = {1}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >

      <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}
      sx={{textAlign:"center"}}>
        <h1>Add a new building</h1>
      </Grid>

      <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12} 
      sx={{textAlign:"center"}}>
        <h2>Please fill out the information of the building:</h2>
      </Grid>

      {/*This area will be the section where admin fills out info*/}
          
          {/* Set the name of the building*/}
          <Grid item>
            <TextField
              label="Building Name" 
              variant="outlined"
              onChange={(e) => setBuildingName(e.target.value)}
              value={buildingName}
              name="buildingName"
              style={{ fontSize: "5vh", width: "30vh", height: "10vh", }}
            />
          </Grid>
          {(formErrors["name"] || formErrors["invalid"]) && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["name"].concat(formErrors["invalid"])}</Alert>}

          {/* Floor Number Input */}
          <Grid style={{ }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              onChange={(e) => setFloorsAmount(Number(e.target.value))}
              label="Number of Floors"
              value={floorsAmount}
              name="RoomNumber"
              style={{ fontSize: "25vh", width: "30vh", height: "10vh", }}
            />
          </Grid>
          {formErrors["flooramount"] && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["flooramount"]}</Alert>}
      
      <div style={{ display: "flex", justifyContent: "center",}}>
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
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
      
    </Grid>
    </div>
    
  );
};

export default formAddBuilding;
<Link href="/admin/roomPages/roomView" passHref></Link>;
