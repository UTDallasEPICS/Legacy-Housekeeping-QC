import { CenterFocusStrong } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

//Next semester, make this dynamic with room information
const roomCards = () => {
  return (
    <>
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
              <h3 style={{ margin: 0 }}>Bathroom 2 #0001</h3>
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
                Bathroom
              </p>
            </div>
          </>
        </Button>
      </div>
    </>
  );
};

export default roomCards;

/*

          <div>
            <p>Building: A</p>
          </div>

          <p>Floor 2</p>
          */
