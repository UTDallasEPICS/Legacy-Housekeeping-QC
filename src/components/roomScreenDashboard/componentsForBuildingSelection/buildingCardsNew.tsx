import { Button, Typography, Container, Box, Grid } from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { alignProperty } from "@mui/material/styles/cssUtils";
import React, {useState, useEffect} from "react";

//This will produce buttons for the user to select

const makeCard = (buildingVal : JSON) => {
  const dispatch = useDispatch();
  let name = buildingVal["building_name"]
  const handleClick = (building: string) => {
    dispatch(setBuilding(building));
  };
  return(
  <Grid item xs = {6} sm = {6} md = {3} lg = {3} xl = {1}
        justifyContent="center"
        textAlign="center">
      <Link href={"/admin/roomPages/floorChoice?building=".concat(name)} passHref>
          <Button
            onClick={() => handleClick("A")}
            variant="contained"
            color="secondary"
            sx={{
              fontweight: "bold",
              fontSize: "3vh",
            }}
            style={{
              minHeight: "20vh",
              minWidth: "20vh",
              maxHeight: "20vh",
              maxWidth: "20vh",
              border: "5px solid",

              //border: 5,
              //backgroundImage:"url(https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910)",
              //backgroundSize:"100%"
            }} 
          >
            {name}
          </Button>
      </Link>
    </Grid>
  )
}
const makeAddCard = () => {
  return(
  <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}
        justifyContent="center"
        textAlign="center">
      <Link href="/admin/roomPages/addBuildingForm" passHref>
          <Button
            variant="contained"
            color="success"
            sx={{
              fontweight: "bold",
              fontSize: "3vh",
              minHeight: "20vh",
              minWidth: "20vh",
              maxHeight: "20vh",
              maxWidth: "20vh",
              border: "5px solid",
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
      <div style={{margin:"2px"}}>
        <Grid container
        columnSpacing={0}
        rowSpacing={2}
        sx={{
          justifyContent:"center",
          //backgroundColor:"red",
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
