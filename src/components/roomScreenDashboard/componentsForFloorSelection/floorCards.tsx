import { Button, Grid } from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {theme} from "../../../theme";

// This will produce floor buttons for the user to select
const makeCard = (number: string, name: string, buildid: string) => {
  const dispatch = useDispatch();

  return (
    <Grid item xs={5} sm={4} md={3} lg={3} xl={2}
      justifyContent="center"
      textAlign="center"
    >
      <Link href={
        "/admin/roomPages/roomView?building="
        .concat(name)
        .concat("&floor=")
        .concat(number)
        .concat("&building_id=")
        .concat(buildid)
      } passHref >
        <Button
          variant="contained"
          sx={{
            minHeight: "12vh",
            minWidth: "40vh",
            maxHeight: "12vh",
            maxWidth: "40vh",
            marginBottom: "-0.5vh",
            fontweight: "bold",
            fontSize: "5vh",
            color: "primary.main",
            border: "4px solid",
            borderColor: "primary.main",
            bgcolor: "white",
            "&:hover": {
              color: "white",
              bgcolor: "primary.main",
            },
          }}
        >
          {number}
        </Button>
      </Link>
    </Grid>
  );
};

const makeEditCard = (bName: string, floors: string, id: string) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      justifyContent="center"
      textAlign="center"
    >
      <Link href={
        "/admin/roomPages/editBuildingForm?building="
        .concat(bName)
        .concat("&floors_amount=")
        .concat(floors)
        .concat("&building_id=")
        .concat(id)
      } passHref >

        <Button
          variant="contained"
          sx={{
            fontweight: "bold",
            fontSize: "2vh",
            minHeight: "10vh",
            minWidth: "20vh",
            maxHeight: "10vh",
            maxWidth: "20vh",
            marginBottom: "2vh",
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
        >
          Edit Building
        </Button>
      </Link>
    </Grid>
  );
};

const floorCards = () => {
  const [result, setResult] = useState([]);

  const getData = () => {
    return fetch("/api/room/specificbuilding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: buildingName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((json) => {
        setResult(json);
      })
      .catch((error) => {});
  };

  // holds building name from url
  let buildingName;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    buildingName = urlParams.get("building");
    getData();
  }, []);

  // first floor rendered is the top floor (top to bottom), 
  // so order floors from top floor first to bottom floor (floor #1) last
  let arr = [];
  for (let i = Number(result["floor_count"]); i >= 1; i--) {
    arr.push(i + "");
  }

  return (
    <div>
      <Grid
        container
        id="cardgrid"
        columnSpacing={0}
        rowSpacing={4}
        sx={{ justifyContent: "center" }}
      >
        <Grid item 
          xs={12} 
          md={12} 
          lg={12} 
          xl={12}
          id="scroll"
          style={{ display: "flex", justifyContent: "center" }}
          justifyContent="center"
        >
          <div
            style={{
              overflowX: "visible",
              width: "50vh",
              display: "justified",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {arr.map((floorNum) =>
                makeCard(floorNum, result["name"], result["id"])
              )}
            </Grid>
            
            {/* ground level line */}
            <div style={{
              marginTop: 1,
              width: "100%",
              borderBottom: "4px solid",
              borderColor: theme.palette.primary.main,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            }} />
          </div>
        </Grid>

        {makeEditCard(result["name"], result["floor_count"], result["id"])}
      </Grid>
    </div>
  );
};

export default floorCards;
