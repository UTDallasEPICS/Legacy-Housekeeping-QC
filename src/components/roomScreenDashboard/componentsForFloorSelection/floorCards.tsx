import { Button, Typography, Container, Box, Grid } from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { alignProperty } from "@mui/material/styles/cssUtils";
import React, {useState, useEffect} from "react";

//This will produce buttons for the user to select

const makeCard = (number : string,name : string, buildid : string) => {
  const dispatch = useDispatch();
  const handleClick = (building: string) => {
    dispatch(setBuilding(building));
  };
  return(
  <Grid item xs = {6} sm = {6} md = {3} lg = {3} xl = {1}
        justifyContent="center"
        textAlign="center">
      <Link href={"/admin/roomPages/roomView?building=".concat(name).concat("&floor=").concat(number).concat("&building_id=").concat(buildid)} passHref>
          <Button
            //onClick={() => handleClick("A")}
            variant="contained"
            color="secondary"
            sx={{
              fontweight: "bold",
              fontSize: "2.5vh",
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
            {"Floor #".concat(number)}
          </Button>
      </Link>
    </Grid>
  )
}
const makeEditCard = (bName : string, floors : string, id : string) => {
  return(
  <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}
        justifyContent="center"
        textAlign="center">
      <Link href={"/admin/roomPages/editBuildingForm?building=".concat(bName).concat("&floors_amount=").concat(floors).concat("&building_id=").concat(id)} passHref>
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
            style={{
              
              //border: 5,
              //backgroundImage:"url(https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910)",
              //backgroundSize:"100%"
            }} 
          >
            Edit Building
          </Button>
      </Link>
    </Grid>
  )
}

const mfloorCards = (results) =>{
  let number = Number(results["floor_count"]);
  let arr = []
  for (let i = 1; i <= number; i++) {
    arr.push(makeCard(i+"",results["name"],results["id"]))
  }
  return(arr)
  
}




const floorCards = () => {
  
  const [result, setResult] = useState([])
  const getData = (apiUrl) => {
    return fetch(apiUrl, 
    {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({
        name : name,
      }),
    })
    .then((response) => {
        if (!response.ok) {
  
        }
        return response.json();
    })
    .then(json => {setResult(json)})
    .catch((error) => {
  
    })
        
   }

   let name
  //When we click a button, we call a reducer to change the state of the building we select
  
  
  

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    name = urlParams.get("building")
    getData("http://localhost:3000/api/room/specificbuilding")
  },[]);

  
  
  //Each button represents a certain building
  return (
      <div style={{margin:"2px"}}>
        <Grid container
        id="cardgrid"
        columnSpacing={0}
        rowSpacing={2}
        sx={{
          justifyContent:"center",
          //backgroundColor:"red",
          }}>
        {mfloorCards(result)}
        {makeEditCard(result["name"],result["floor_count"],result["id"])}
        
        
    </Grid>
      </div>
    
  );
  
};

export default floorCards;

/*
            onClick={(e) => {
              e.preventDefault();
              handleClick("A");
            }}
*/
