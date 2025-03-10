import {
  Button,
  Typography,
  Grid,
  IconButton,
  Card,
} from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";

// This will produce building buttons for the user to select
const makeCard = (buildingVal: JSON) => {
  const dispatch = useDispatch();

  let name = buildingVal["name"];
  let id = buildingVal["id"];

  const handleClick = (building: string) => {
    dispatch(setBuilding(building));
  };

  return (
    <Grid item key={id} xs={5} sm={4} md={3} lg={3} xl={2} textAlign="center" >
      <Card sx={{
        border: "1px solid grey",
        borderRadius: 1,
      }}>
        <Link
          href={`/admin/roomPages/floorChoice?building=${name}`}
          passHref
          style={{ textDecoration: "none" }}
        >
          <IconButton
            onClick={() => handleClick("A")}
            sx={{
              display: "inline",
              alignItems: "center",
              "&:hover": {
                color: "primary.main",
                bgcolor: "transparent",
              },
            }}
          >
            <ApartmentIcon sx={{ fontSize: "15vh" }} />
            <Typography variant="body1" sx={{
              fontSize: "3vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {name}
            </Typography>
          </IconButton>
        </Link>
      </Card>
    </Grid >
  );
};

// add building button 
const makeAddCard = () => {
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
      <Link href="/admin/roomPages/addBuildingForm" passHref>
        <Button
          variant="contained"
          sx={{
            fontweight: "bold",
            fontSize: "2vh",
            color: "secondary.main",
            minHeight: "10vh",
            minWidth: "20vh",
            maxHeight: "10vh",
            maxWidth: "20vh",
            border: "0.5vh solid",
            borderColor: "secondary.main",
            bgcolor: "transparent",
            "&:hover": {
              color: "white",
              bgcolor: "secondary.main",
            },
          }}
        >
          Add Building
        </Button>
      </Link>
    </Grid>
  );
};

// makes all the building buttons and the add button
const buildingCardsNew = () => {
  const [buildings, setBuilding] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("/api/room/buildings");
      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await response.json();
      setBuilding(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Each button represents a certain building
  return (
    <div style={{ margin: "0px" }}>
      <Grid
        container
        columnSpacing={0}
        rowSpacing={10}
        spacing={2}
        sx={{
          justifyContent: "center",
        }}
      >
        {buildings.map((building: any) => makeCard(building))}
        {makeAddCard()}
      </Grid>
    </div>
  );
};

export default buildingCardsNew;
