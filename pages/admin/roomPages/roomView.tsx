//This will be for looking at the rooms we have
import React, {useState, useEffect} from "react";
import BuildingRoomBanner from "../../../src/components/roomScreenDashboard/componentsForRoomView/buildingRoomBanner";
import AddRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/addRoomButton";
import RoomCards from "../../../src/components/roomScreenDashboard/componentsForRoomView/roomCards";
import SortButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/sortButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button, Grid } from "@mui/material";
import { setRoom } from "../../../slices/roomSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
import theme from "../../../pages/theme";

const getTypeDisplayName = (type) => {
  switch (type) {
    case "COMMON_AREA":
      return "Common Area";
    case "PERSONAL_ROOM":
      return "Personal Room";
    default:
      return type;
  }
};

const makeButton = (roomJSON : JSON) => {
  const dispatch = useDispatch();

  const handleClick = (roomJSON: JSON) => {
    dispatch(setRoom(roomJSON));
   };

  let roomId = roomJSON["id"];
  let roomName = roomJSON["name"];
  let floorNumber = roomJSON["floor_number"];
  let typeOfRoom = roomJSON["type"];
  let buildingId = roomJSON["building_id"];

  let newLink = `/admin/roomPages/editRoomForm?buildingId=${buildingId}&floor=${floorNumber}&roomId=${roomId}`;

  return(
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      item xs = {12} md = {6} lg = {3} xl = {1}
      alignItems="center"
      justifyContent="center"
    >
      <Link href={newLink} passHref>
        <Button
          style={{
            width: "30vh", 
            height: "15vh", 
            fontSize: "2.5vh", 
            margin: 5, 
            textTransform: "none",
          }}
          sx={{ 
            backgroundColor: "white",
            border: 5, 
            justifyContent: "center", 
            alignContent:"center", 
            "&:hover": {            
              border: 5,
              borderColor: "primary.main",
              color: "white",
              backgroundColor: "primary.main", 
            }
          ,}}
          onClick={() => handleClick(roomJSON)}
        >
          <div>
              <h3 style={{ margin: 0 }}>{roomName} #{roomId} </h3>
              <p
                style={{
                  display: "block",
                  margin: 2,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                {getTypeDisplayName(typeOfRoom)}
              </p>
          </div>
        </Button>
      </Link>
    </Grid>
  )
}

const roomView = () => {
  let buildingParam : string
  let floorParam : string
  let buildid: string
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [buildingid, setBuildingid] = useState("");
  const [rooms, setRooms] = useState([]);

  const getData = (apiUrl) => {
    return fetch(apiUrl, {method: "POST",
    headers: {"Content-Type": "application/json",}, 
    body:JSON.stringify({
      floor_num: floorParam,
      building_id: buildid,
    })})
      .then((response) => {
        if (!response.ok) {

        }
        return response.json();
      })
        .then(json => {setRooms(json)})
        .catch((error) => {

      })
    }
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    buildingParam = urlParams.get("building");
    floorParam = urlParams.get("floor");
    buildid = urlParams.get("building_id");
    setBuilding(buildingParam);
    setFloor(floorParam);
    setBuildingid(buildid);
    getData("http://localhost:3000/api/room/roomsInBuildingOnFloor");
  }, []);

  return (
    <div style={{background: theme.palette.background.default, height:"100vh"}}>
      <div>
        <Navbar/>
        <BuildingRoomBanner buildingVal={building}/>
      </div>
      <Grid container 
          direction="column"
          justifyContent="center"
      >
        <Grid container 
            direction="row"
            justifyContent="center"
            marginTop={2}
            marginBottom={2}
        >
          <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 20,
          }}
        >
          <SortButton />  {/* currently does nothing */}
        </Grid>
        
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
        </Grid>
        
          <AddRoomButton buildingName={building} floorName={floor} buildid={buildingid}/>
          {/*<DeleteRoomButton /> */}
        </Grid>
        {/*This presents a area where user can scroll and look through the rooms */}
        <Grid id="scroll" 
          style={{ display: "flex", justifyContent: "center" }}
          justifyContent="center"
          item xs = {12} md = {12} lg = {12} xl = {12}
          >
          <div
            style={{
              overflowY: "scroll",
              width: "50vh",
              height: "60vh",
              display: "justified",
              justifyContent: "center",
            }}
          >
            
            <Grid container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
                {rooms.map(roomVal => (makeButton(roomVal)))}
            </Grid>
          </div>
          
        </Grid>
      </Grid>
    </div>
  );
};
  
export default roomView;
