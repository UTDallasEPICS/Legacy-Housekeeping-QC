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

  console.log(props.options.length);

  return (
    <div>
      <select>
        {floorArray.map((floor, index) => {
          return (
            <optgroup key={index} label={props.options[index].building_name}>
              {floor.map((floor) => {
                return (
                  <option key={floor} value={floor}>
                    {floor}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
};

export default BuildingDropdownSelect;
