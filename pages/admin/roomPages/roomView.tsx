//This will be for looking at the rooms we have
import React, { useState, useEffect, useContext } from "react";
import BuildingRoomBanner from "../../../src/components/roomScreenDashboard/componentsForRoomView/buildingRoomBanner";
import AddRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/addRoomButton";
import SortDropdown from "../../../src/components/roomScreenDashboard/componentsForRoomView/sortDropdown";
import { Button, Grid } from "@mui/material";
import { setRoom } from "../../../slices/roomSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
import { theme } from "../../../src/theme";

// Function to get the display name of a room type
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

const makeEditButton = (roomJSON: JSON) => {
  const dispatch = useDispatch();

  const handleClick = (roomJSON: JSON) => {
    dispatch(setRoom(roomJSON));
  };

  let roomId = roomJSON["id"];
  let roomName = roomJSON["name"];
  let floorNumber = roomJSON["floor_number"];
  let typeOfRoom = roomJSON["type"];
  let buildingId = roomJSON["building_id"];

  let editLink = `/admin/roomPages/editRoomForm?buildingId=${buildingId}&floor=${floorNumber}&roomId=${roomId}`;

  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      item
      xs={12}
      md={6}
      lg={3}
      xl={1}
      alignItems="center"
      justifyContent="center"
    >
      <Link href={editLink} passHref>
        <Button
          sx={{
            width: "30vh",
            height: "15vh",
            fontSize: "2.5vh",
            margin: "4px",
            textTransform: "none",
            backgroundColor: "white",
            border: 5,
            justifyContent: "center",
            alignContent: "center",
            "&:hover": {
              border: 5,
              borderColor: "primary.main",
              color: "white",
              backgroundColor: "primary.main",
            },
          }}
          onClick={() => handleClick(roomJSON)}
        >
          <div>
            <h3 style={{ margin: 0 }}>
              {roomName} #{roomId}{" "}
            </h3>
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
  );
};

const roomView = () => {
  let buildingParam: string;
  let floorParam: string;
  let buildid: string;
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  const getRooms = async (sortOption: string) => {
    try {
      const response = await fetch("/api/room/roomsInBuildingOnFloor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          floor_num: floorParam,
          building_id: buildid,
          room_type: sortOption
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Fetch rooms data from url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    buildingParam = urlParams.get("building");
    floorParam = urlParams.get("floor");
    buildid = urlParams.get("building_id");
    console.log("building: ", buildingParam);
    console.log("floor: ", floorParam);

    setBuilding(buildingParam);
    setFloor(floorParam);
    setBuildingId(buildid);
    getRooms(sortOption);
  }, [sortOption]);

  // Render the roomview component
  return (
    <div
      style={{ background: theme.palette.background.default, height: "100vh" }}
    >
      {/* heading */}
      <Navbar />
      <div >
        <BuildingRoomBanner greeting="Welcome to Building" buildingVal={building} />
      </div>

      {/* main content of page */}
      <Grid container direction="column" justifyContent="center">
        {/* sort and add button */}
        <Grid
          container
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
            <SortDropdown onSortChange={setSortOption} /> {/* Sort Dropdown and the value that it passes */}
          </Grid>

          <AddRoomButton
            buildingName={building}
            floorName={floor}
            buildid={buildingId}
          />

          {/* <DeleteRoomButton /> */}
        </Grid>

        {/* area where user can scroll and look through the rooms */}
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
          <div style={{
            overflowY: "scroll",
            width: "50vh",
            height: "60vh",
            display: "justified",
            justifyContent: "center",
          }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {rooms.map((roomVal) => makeEditButton(roomVal))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default roomView;
