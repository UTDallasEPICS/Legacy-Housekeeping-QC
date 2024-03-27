import { Button, Grid } from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
//import { alignProperty } from "@mui/material/styles/cssUtils";
import React, { useState, useEffect } from "react";

//This will produce buttons for the user to select

const makeCard = (number: string, name: string, buildid: string) => {
  const dispatch = useDispatch();
  const handleClick = (building: string) => {
    dispatch(setBuilding(building));
  };
  return (
    <Grid
      item
      xs={5}
      sm={4}
      md={3}
      lg={3}
      xl={2}
      justifyContent="center"
      textAlign="center"
    >
      <Link
        href={"/admin/roomPages/roomView?building="
          .concat(name)
          .concat("&floor=")
          .concat(number)
          .concat("&building_id=")
          .concat(buildid)}
        passHref
      >
        <Button
          //onClick={() => handleClick("A")}
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
          {"".concat(number)}
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
      <Link
        href={"/admin/roomPages/editBuildingForm?building="
          .concat(bName)
          .concat("&floors_amount=")
          .concat(floors)
          .concat("&building_id=")
          .concat(id)}
        passHref
      >
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
            marginBottom: "2vh",
            "&:hover": {
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

/*const mfloorCards = (results) =>{
  let number = Number(results["floors_amount"]);
  let arr = []
  for (let i = 1; i <= number; i++) {
    //arr.push(makeCard(i+"",results["building_name"],results["id"]))
    arr.push(i+"")
  }
  
  return(arr)
}*/

const floorCards = () => {
  const [result, setResult] = useState([]);
  const getData = (apiUrl) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
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

  let name;
  //When we click a button, we call a reducer to change the state of the building we select

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    name = urlParams.get("building");
    getData("http://localhost:3000/api/room/specificbuilding");
  }, []);

  {
    /* */
  }
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
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid
          id="scroll"
          style={{ display: "flex", justifyContent: "center" }}
          justifyContent="center"
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
        >
          <div
            style={{
              overflowX: "visible",
              width: "50vh",
              display: "justified",
              justifyContent: "center",
              //marginLeft: "16px", // width of scrollbar
            }}
          >
            <Grid
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {arr.map((floorNum) =>
                makeCard(floorNum, result["name"], result["id"])
              )}
            </Grid>
            <div
              style={{
                marginTop: 2,
                width: "100%",
                borderBottom: "4px solid",
                borderColor: "primary.main",
              }}
            />
          </div>
        </Grid>

        {makeEditCard(result["name"], result["floor_count"], result["id"])}
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
