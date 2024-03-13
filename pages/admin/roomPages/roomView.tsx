//This will be for looking at the rooms we have
import React, {useState, useEffect} from "react";
import BuildingRoomBanner from "../../../src/components/roomScreenDashboard/componentsForRoomView/buildingRoomBanner";
import { BackButton, Scroll } from "../../../src/components";
import AddRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/addRoomButton";
import DeleteRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/deleteRoomButton";
import RoomCards from "../../../src/components/roomScreenDashboard/componentsForRoomView/roomCards";
import SortButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/sortButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button, Grid } from "@mui/material";
import { Diversity3 } from "@mui/icons-material";
import { setRoom } from "../../../slices/roomSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useSearchParams } from "react-router-dom";



const makeButton = (roomJSON : JSON) => {
  const dispatch = useDispatch();
  const handleClick = (roomJSON: JSON) => {
    dispatch(setRoom(roomJSON));
   };
  let roomName = roomJSON["name"];
  let floorNumber = roomJSON["floor_number"];
  let typeOfRoom = roomJSON["type"];
  let roomId = roomJSON["id"];
  let building = roomJSON["building_id"];
  let newLink = "/admin/roomPages/editRoomForm?building=".concat(building).concat("&floor=").concat(floorNumber)
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
            style={{width: '30vh', height: '15vh', fontSize: "2.5vh" }}
            sx={{ border: 5, justifyContent: "center", alignContent:"center"}}
            onClick={() => handleClick(roomJSON)}
          >
            <div>
                <h3 style={{ margin: 0 }}>{roomName} </h3>
                <p
                  style={{
                    display: "block",
                    margin: 2,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {typeOfRoom}
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
  const [floor,setFloor] = useState("");
  const [buildingid, setBuildingid] = useState("");
  const [result, setResult] = useState([])
  /*
  const building = useSelector(
    (state: RootState) => state.buildingSelect.building
  );
  */

  async function getData(apiUrl) {

    return fetch(apiUrl, {method: "POST",
    headers: {"Content-Type": "application/json",},
    body:JSON.stringify(
      {
        floor_num: floorParam,
        building_id: buildid,
      })})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            console.log(json)
            setResult(json)
        })
        .catch((error) => {
  
        })
   }

  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    buildingParam = urlParams.get("building")
    floorParam = urlParams.get("floor")
    buildid = urlParams.get("building_id")
    setBuilding(buildingParam);
    setFloor(floorParam)
    setBuildingid(buildid)
    getData("http://localhost:3000/api/room/roomsInBuildingOnFloor")
  },[]);

  return (
    <div style={{marginTop:10,background: 'linear-gradient(#141c3b,#ffffff)',height:"100vh"}}>
      <Grid container spacing = {1}
            direction="column"
            justifyContent="center"
            //alignItems="center"
      >
        
        <Grid item>
          <BuildingRoomBanner buildingVal={building}/>
          <BackButton pageToGoBack={"/admin/roomPages/floorChoice?building=".concat(building)}/>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h2 style={{ paddingTop: 20, fontSize: 40 }}>Current Rooms:</h2>
        </Grid>

        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <SortButton />
        </Grid>

        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
          item xs = {12}
        >
          <AddRoomButton buildingName={building} floorName={floor} buildid={buildingid}/>
          {/*<DeleteRoomButton /> */}
        </Grid>
        {/*This presents a area where user can scroll and look through the rooms */}
        <Grid id="scroll" 
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
          justifyContent="center"
          item xs = {12} md = {12} lg = {12} xl = {12}
          >
          <div
            style={{
              overflowY: "scroll",
              width: "50vh",
              height: "50vh",
              display: "justfied",
              justifyContent: "center",
            }}
          >
            <Grid
              direction="column"
              alignItems="center"
              justifyContent="center"

            >
                {result.map(roomVal => (makeButton(roomVal)))}
            </Grid>
          </div>
          
        </Grid>
      </Grid>
    </div>
  );
};

export default roomView;

/*
        style={{
          width: 630,
          height: 700,
          display: "flex",
          justifyContent: "center",
        }}
*/
