import React, { useState } from "react";
import { Button, Alert, TextField, Grid, AppBar } from "@mui/material";
import Navbar from "../../../../src/components/adminDashboard/navbar/navbar";
import formBuildingValidation from "./formBuildingValidation";
import Banner from "../../adminDashboard/Banner/Banner";

const FormAddBuilding = () => {
  // State
  const [error, setError] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [floorsAmount, setFloorsAmount] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  let goBackLink = "/admin/roomPages/buildingChoice";

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

      window.location.replace(goBackLink);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div>
        <Banner relativePath={goBackLink} function={"Add a New Building"} />
      </div>


      <Grid container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <h2>Please fill out the information of the building:</h2>
        </Grid>

        {/* Form inputs */}
        <Grid item>
          <TextField
            label="Building Name"
            InputLabelProps={{
              style: { color: 'black' },
            }}
            color="secondary"
            placeholder="Building Name"
            onChange={(e) => setBuildingName(e.target.value)}
            value={buildingName}
            name="buildingName"
            sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
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
            InputLabelProps={{ style: { color: "#6A172E" } }}
            color="secondary"
            value={floorsAmount}
            name="RoomNumber"
            type="number"
            sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
          />

          {formErrors["flooramount"] && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
              {formErrors["flooramount"]}
            </Alert>
          )}
        </Grid>

        {/* submit button */}
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              border: 2,
              bgcolor: "white",
              "&:hover": {
                border: 4,
                borderColor: "primary.main",
                color: "white",
                bgcolor: "primary.main",
              },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormAddBuilding;
