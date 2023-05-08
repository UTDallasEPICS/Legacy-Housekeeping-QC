//This will be for looking at the rooms we have
import React from "react";
import BuildingRoomBanner from "../../../src/components/roomScreenDashboard/componentsForRoomView/buildingRoomBanner";
import { BackButton } from "../../../src/components";
import AddRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/addRoomButton";
import DeleteRoomButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/deleteRoomButton";
import RoomCards from "../../../src/components/roomScreenDashboard/componentsForRoomView/roomCards";
import SortButton from "../../../src/components/roomScreenDashboard/componentsForRoomView/sortButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button } from "@mui/material";
const roomView = () => {
  //Checking if out state is set properly

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
          {/*Static Data Here */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ width: 600, height: 100, fontSize: 20 }}
              sx={{ border: 5 }}
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
                  <h3 style={{ margin: 0 }}>Marly Johnson #345</h3>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Floor 3
                  </p>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Independent Living
                  </p>
                </div>
              </>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ width: 600, height: 100, fontSize: 20 }}
              sx={{ border: 5 }}
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
                  <h3 style={{ margin: 0 }}>Carly Lentil #212</h3>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Floor 2
                  </p>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Assisted Living
                  </p>
                </div>
              </>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ width: 600, height: 100, fontSize: 20 }}
              sx={{ border: 5 }}
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
                  <h3 style={{ margin: 0 }}>Tonka Williamson #112</h3>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Floor 1
                  </p>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Memory Care
                  </p>
                </div>
              </>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ width: 600, height: 100, fontSize: 20 }}
              sx={{ border: 5 }}
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
                  <h3 style={{ margin: 0 }}>Beth Contue #22</h3>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Floor 2
                  </p>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Skilled Nursing
                  </p>
                </div>
              </>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ width: 600, height: 100, fontSize: 20 }}
              sx={{ border: 5 }}
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
                  <h3 style={{ margin: 0 }}>Jones Pub</h3>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Floor 1
                  </p>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Auxillary
                  </p>
                </div>
              </>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ width: 600, height: 100, fontSize: 20 }}
              sx={{ border: 5 }}
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
                  <h3 style={{ margin: 0 }}>Bathroom #0001</h3>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Floor 1
                  </p>
                  <p
                    style={{
                      display: "inline",
                      margin: 2,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    Bathroom
                  </p>
                </div>
              </>
            </Button>
          </div>
        </div>
        {/*Static Data Here */}
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
