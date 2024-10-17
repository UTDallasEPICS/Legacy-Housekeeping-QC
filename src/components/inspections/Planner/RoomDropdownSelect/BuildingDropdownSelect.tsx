import React, { useState, useEffect } from "react";
import { BuildingDropdownSelectProps, RoomOptionProps } from "./props";

const BuildingDropdownSelect = (props: BuildingDropdownSelectProps) => {
  const [building, setBuilding] = useState(props.selected);
  const [floor, setFloor] = useState(-1);

  // Props passes the number of floors in each building. Converts to an array that represents each individual floor
  let floorArray: number[][] = [];
  for (let i = 0; i < props.options.length; i++) {
    console.log(props.options);
    floorArray[i] = Array.from(
      { length: props.options[i].floor_number },
      (_, j) => j + 1
    );
  }

  return (
    <div>
      {floorArray.map((floor, index) => {
        return (
          <div key={index}>
            <h1>{props.options[index].building_name}</h1>
            <select onChange={(e) => setFloor(parseInt(e.target.value))}>
              <option value={-1}>Select a floor</option>
              {floor.map((f) => {
                return (
                  <option key={f} value={f}>
                    Floor {f}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default BuildingDropdownSelect;
