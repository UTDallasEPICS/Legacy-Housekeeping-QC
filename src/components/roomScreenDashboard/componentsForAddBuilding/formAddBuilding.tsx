import React, { useState } from "react";
import { Button, Alert, TextField, Grid } from "@mui/material";
import Navbar from "../../../../src/components/adminDashboard/navbar/navbar";
import BackButton from "../../globalComponents/backButton";
import formBuildingValidation from "./formBuildingValidation";

const FormAddBuilding = () => {
  // State
  const [error, setError] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [floorsAmount, setFloorsAmount] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  // Form submission
  const handleSubmit = async () => {
    const resCheck = formBuildingValidation(buildingName, floorsAmount);
    setFormErrors(resCheck);

    if (resCheck !== 0) {
      return;
    }

    try {
      const res = await fetch("/api/room/addbuilding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          building_name: buildingName,
          floors_amount: floorsAmount,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }

      window.location.replace("/admin/roomPages/buildingChoice");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div>
        <BackButton pageToGoBack={"/admin/roomPages/buildingChoice"} />
      </div>

      <Grid container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <h1>Add a new building</h1>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <h2>Please fill out the information of the building:</h2>
        </Grid>

        {/* Form inputs */}
        <Grid item>
          <TextField
            label="Building Name"
            variant="outlined"
            onChange={(e) => setBuildingName(e.target.value)}
            value={buildingName}
            name="buildingName"
            style={{ fontSize: "5vh", width: "30vh", height: "10vh" }}
          />
          {(formErrors["name"] || formErrors["invalid"]) && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
              {formErrors["name"].concat(formErrors["invalid"])}
            </Alert>
          )}
        </Grid>

        <Grid item>
          <TextField
            onChange={(e) => setFloorsAmount(Number(e.target.value))}
            label="Number of Floors"
            value={floorsAmount}
            name="RoomNumber"
            style={{ fontSize: "25vh", width: "30vh", height: "10vh" }}
          />
          {formErrors["flooramount"] && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
              {formErrors["flooramount"]}
            </Alert>
          )}
        </Grid>

        {/* submit button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default FormAddBuilding;
