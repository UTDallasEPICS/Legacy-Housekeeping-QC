import React from "react";
import { useState, useEffect } from "react";
import formBuildingValidation from "../componentsForAddBuilding/formBuildingValidation";
import { Button, Alert, TextField, Grid, InputLabel } from "@mui/material";
import Navbar from "../../../../src/components/adminDashboard/navbar/navbar";
import { useRouter } from 'next/router';
import Link from "next/link";
import BuildingRoomBanner from "../componentsForRoomView/buildingRoomBanner";

const formEditBuilding = () => {
  const [error, setError] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [floorsAmount, setFloorsAmount] = useState(0);
  const [building_id, setBuildingId] = useState("");
  const [result, setResult] = useState([]);
  const [formErrors, setFormErrors] = useState<any>({});
  const router = useRouter();

  let goBackLink = "/admin/roomPages/buildingChoice";

  {/*Unused?*/ }
  const getData = (apiUrl) => {
    return fetch(apiUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          building_name: buildingParam,
        }),
      })
      .then((response) => {
        if (!response.ok) {

        }
        return response.json();
      })
      .then(json => { setResult(json) })
      .catch((error) => {

      })

  }

  let buildingParam;
  let floorsParam;
  let buildingId;


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    buildingParam = urlParams.get("building")
    floorsParam = urlParams.get("floors_amount")
    buildingId = urlParams.get("building_id")
    console.log(result)
    setBuildingName(buildingParam);
    setFloorsAmount(Number(floorsParam));
    setBuildingId(buildingId);
  }, []);



  //validates what info they are submitting
  const handleSubmit = async () => {
    const resCheck = formBuildingValidation(
      buildingName,
      floorsAmount,
    );

    setFormErrors(resCheck);
    if (resCheck != 0) {
      //setError(resCheck);
      return;
    }

    //Sending data to the api
    if (confirm("Are you sure you would like to edit this building?") == true) {
      const res = await fetch("/api/room/editbuilding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: building_id,
          building_name: buildingName,
          floors_amount: floorsAmount
        }),
      });

      if (!res.ok) {
        const r = await res.json();
        setError(r.error);
        return;
      }
      router.push(goBackLink);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you would like to delete this building? (This will delete all rooms associated to this building)") == true) {
      const res = await fetch("/api/room/deletebuilding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: building_id,
          building_name: buildingName,
        }),
      });

      if (!res.ok) {
        const r = await res.json();
        setError(r.error);
        return;
      }
      router.push(goBackLink);
    }
  };

  //Actual form

  return (
    <>
      <Navbar />
      <div>
        <BuildingRoomBanner greeting="Edit Building" buildingVal={buildingName} />
      </div>

      <Grid container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center">

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
          sx={{ textAlign: "center" }}>
          <h2>Please fill out the information of the building:</h2>
        </Grid>

        {/*This area will be the section where admin fills out info*/}
        {/* Set the name of the room*/}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems={"center"}>
          <TextField
            label="Building Name"
            variant="outlined"
            onChange={(e) => setBuildingName(e.target.value)}
            value={buildingName}
            InputLabelProps={{ style: { color: "#6A172E" } }}
            sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
          />
        </Grid>
        {(formErrors["name"] || formErrors["invalid"]) && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["name"].concat(formErrors["invalid"])}</Alert>}

        {/* Room Number Input */}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            onChange={(e) => setFloorsAmount(Number(e.target.value))}
            label="# of Floors"
            value={floorsAmount}
            name="RoomNumber"
            InputLabelProps={{ style: { color: "#6A172E" } }}
            sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
          />
        </Grid>

        {formErrors["flooramount"] && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{formErrors["flooramount"]}</Alert>}

        <Grid item>
          <Button
            variant="outlined"
            sx={{
              border: 3,
              borderColor: "primary.main",
              color: "primary.main",
              bgcolor: "white",
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
              borderColor: "secondary.main",
              color: "secondary.main",
              bgcolor: "white",   
              "&:hover": {
                border: 3,
                borderColor: "secondary.main",
                color: "white",
                bgcolor: "secondary.main",
              },
            }}
            onClick={() => handleDelete()}>
            Delete Building
          </Button>

        </Grid>


      </Grid>
    </>

  );
};

export default formEditBuilding;
<Link href="/admin/roomPages/roomView" passHref></Link>;