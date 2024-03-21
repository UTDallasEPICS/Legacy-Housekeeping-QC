import { Button, Typography, Container, Box, Grid, IconButton } from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";

//This will produce buttons for the user to select

const makeCard = (buildingVal : JSON) => {
  const dispatch = useDispatch();
  let name = buildingVal["building_name"]
  const handleClick = (building: string) => {
    dispatch(setBuilding(building));
  };
  return(
  <Grid item xs = {5} sm = {4} md = {3} lg = {3} xl = {2}
    textAlign="center">
    <Link href={`/admin/roomPages/floorChoice?building=${name}`} passHref
      style={{ textDecoration: 'none' }}  
    >
    <IconButton
      onClick={() => handleClick("A")}
      sx={{
        display: "inline",
        alignItems: "center",
			  minHeight: "20vh",
			  minWidth: "20vh",
			  maxHeight: "20vh",
			  maxWidth: "20vh",
        "&:hover": {
          color: "primary.main"
        },
      }}
    >
      <ApartmentIcon sx={{ fontSize: "15vh"}} /> {/* Adjust the size of the icon */}
      <Typography 
        variant="body1" 
        sx={{ fontSize: "3vh" }}>
          {name}
      </Typography>
    </IconButton>
    </Link>
  </Grid>
  )
}
const makeAddCard = () => {
  return (
    <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}
      justifyContent="center"
      textAlign="center">
      <Link href="/admin/roomPages/addBuildingForm" passHref>
        <Button
          variant="contained"
          //color="secondary"
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
  )
}

const buildingCardsNew = () => {
  //When we click a button, we call a reducer to change the state of the building we select
  
  const [result, setResult] = useState([])

  useEffect(() => {
    getData("http://localhost:3000/api/room/buildings")
  },[]);

  const getData = (apiUrl) => {
    return fetch(apiUrl, {method: "GET",
    headers: {"Content-Type": "application/json",},})
      .then((response) => {
        if (!response.ok) {

        }
        return response.json();
      })
      .then(json => {setResult(json)})
        .catch((error) => {
  
      })
   }
  
  //Each button represents a certain building
  return (
    <div style={{margin:"0px"}}>
      <Grid container
        columnSpacing={0}
        rowSpacing={10}
        sx={{
          justifyContent:"center",
          }}>
        {result.map(buildingVal => (makeCard(buildingVal)))}
        {makeAddCard()}     
      </Grid>
    </div>
  );
  
};

export default buildingCardsNew;

/*
            onClick={(e) => {
              e.preventDefault();
              handleClick("A");
            }}
*/
