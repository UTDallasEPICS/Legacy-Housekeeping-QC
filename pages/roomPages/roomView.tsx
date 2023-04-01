//This will be for looking at the rooms we have
import React from "react";
import BuildingRoomBanner from "../../src/components/roomScreenDashboard/componentsForRoomView/buildingRoomBanner";
import BackButton from "../../src/components/backButton";
import AddRoomButton from "../../src/components/roomScreenDashboard/componentsForRoomView/addRoomButton";
import DeleteRoomButton from "../../src/components/roomScreenDashboard/componentsForRoomView/deleteRoomButton";
import RoomCards from "../../src/components/roomScreenDashboard/componentsForRoomView/roomCards";
import SortButton from "../../src/components/roomScreenDashboard/componentsForRoomView/sortButton";
const roomView = () => {
  return (
    <>
      <div>
        <BackButton pageToGoBack={"/roomPages/buildingChoice"} />
      </div>
      <div>
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
        <DeleteRoomButton />
      </div>

      {/*This presents a area where user can scroll and look through the rooms */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            overflowY: "scroll",
            width: 630,
            height: 420,
            display: "justfied",
            justifyContent: "center",
          }}
        >
          <RoomCards />
          <RoomCards />
          <RoomCards />
          <RoomCards />
          <RoomCards />
          <RoomCards />
          <RoomCards />
          <RoomCards />
          <RoomCards />
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
