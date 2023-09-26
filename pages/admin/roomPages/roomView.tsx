//This will be for looking at the rooms we have
import React, {useState, useEffect} from "react";
import BuildingRoomBanner from "../../../src/components/roomScreenDashboard/componentsForRoomView/buildingRoomBanner";
import { BackButton } from "../../../src/components";
import AddRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/addRoomButton";
import DeleteRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/deleteRoomButton";
import RoomCards from "../../../src/components/roomScreenDashboard/componentsForRoomView/roomCards";
import SortButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/sortButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button } from "@mui/material";
import { Diversity3 } from "@mui/icons-material";
import { setRoom } from "../../../slices/roomSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";




const makeButton = (roomJSON : JSON) => {
  const dispatch = useDispatch();
  const handleClick = (roomJSON: JSON) => {
    dispatch(setRoom(roomJSON));
   };
  let roomName = roomJSON["room_name"];
  let roomNumber = roomJSON["room_number"];
  let floorNumber = roomJSON["floor_num"];
  let typeOfRoom = roomJSON["type_of_room"];
  let roomId = roomJSON["room_id"];
  return(
  <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Link href="/admin/roomPages/editRoomForm" passHref>
              <Button
                style={{ width: 600, height: 100, fontSize: 20 }}
                sx={{ border: 5 }}
                onClick={() => handleClick(roomJSON)}
              >
                <>
                  <div
                    style={{
                      display: "inline",
                      justifyContent: "center",

                      width: 400,
                      marginBottom: 5,
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{roomName} #{roomNumber}</h3>
                    <p
                      style={{
                        display: "inline",
                        margin: 2,
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                    >
                      Floor {floorNumber}
                    </p>
                    <p
                      style={{
                        display: "inline",
                        margin: 2,
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                    >
                      {typeOfRoom}
                    </p>
                  </div>
                </>
              </Button>
            </Link>
          </div>
  )
}


const roomView = () => {
  
  
  const [result, setResult] = useState([])

  const building = useSelector(
    (state: RootState) => state.buildingSelect.building
  );

  useEffect(() => {
    getData("http://localhost:3000/api/room/rooms".concat(building))
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
  console.log(result)

  return (
    <>
      <div>
        <BackButton pageToGoBack={"/admin/roomPages/buildingChoice"} />
        <BuildingRoomBanner />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2 style={{ paddingTop: 20, fontSize: 40 }}>Current Rooms:</h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <SortButton />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <AddRoomButton />
        {/*<DeleteRoomButton /> */}
      </div>

      {/*This presents a area where user can scroll and look through the rooms */}
      <div id="scroll" style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            overflowY: "scroll",
            width: 630,
            height: 420,
            display: "justfied",
            justifyContent: "center",
          }}
        >
          {/*Static Data Here */}
          
          <div>
            {result.map(roomVal => (makeButton(roomVal)))}
          </div>
          {/*Static Data Here */}
        </div>
        
      </div>
    </>
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
