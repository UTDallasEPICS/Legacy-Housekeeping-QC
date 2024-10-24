import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box, FormControl } from "@mui/material";
import RoomDropdownSelect from "./RoomDropdownSelect";

const BuildingDropdownSelect = (props) => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [roomOptions, setRoomOptions] = useState([]);

  const floorOptions = props.options.flatMap((option) =>
    Array.from({ length: option.floor_number }, (_, j) => ({
      name: option.building_name,
      buildingId: option.building_id,
      floor: j + 1,
    }))
  );

  const rendRoom = () => {
    if (selectedFloor !== null) {
      return (
        <RoomDropdownSelect
          options={roomOptions}
          selected={props.selected}
          handleChange={props.handleChange}
        />
      );
    }
  };

  useEffect(() => {
    console.log(props.roomOptions);
    console.log(selectedFloor);
    if (selectedFloor) {
      const filteredRooms = props.roomOptions.filter(
        (option) =>
          option.floor_number === selectedFloor.floor &&
          option.building_name === selectedFloor.name
      );
      setRoomOptions(filteredRooms);
    }
    console.log(roomOptions);
  }, [selectedFloor]);

  return (
    <div>
      <FormControl fullWidth>
        <Autocomplete
          options={floorOptions}
          getOptionLabel={(option) =>
            option.floor === -1 ? "" : "Floor " + option.floor
          }
          groupBy={(option) => option.name}
          isOptionEqualToValue={(option, value) =>
            option.buildingId === value.buildingId &&
            option.floor === value.floor
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Select a floor"
              label="Select a floor"
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {`Floor ${option.floor}`}
            </Box>
          )}
          value={selectedFloor}
          onChange={(event, value) => setSelectedFloor(value)}
        />
      </FormControl>
      {rendRoom()}
    </div>
  );
};

export default BuildingDropdownSelect;
