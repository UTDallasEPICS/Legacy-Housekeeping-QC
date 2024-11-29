import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box, FormControl } from "@mui/material";
import RoomDropdownSelect from "./RoomDropdownSelect";

const BuildingDropdownSelect = (props) => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [roomOptions, setRoomOptions] = useState(props.roomOptions || []);

  const floorOptions = props.options.flatMap((option) =>
    Array.from({ length: option.floor_number }, (_, j) => ({
      name: option.building_name,
      buildingId: option.building_id,
      floor: j + 1,
    }))
  );

  useEffect(() => {
    console.log("Floor options: ", floorOptions);
    console.log("Room options: ", roomOptions);
    console.log("Selected Floor:", selectedFloor);
    if (selectedFloor) {
      const filteredRooms = roomOptions.filter(
        (option) =>
          option.floor_number === selectedFloor.floor &&
          option.building_name === selectedFloor.name
      );
      setRoomOptions(filteredRooms);
      console.log(filteredRooms);
      props.handleChange(filteredRooms);
    }
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
          renderGroup={(params) => (
            <li>
              <div style={{ color: "#6A172E", fontWeight: "bold" }}>
                {"Building: " + params.group}
              </div>
              {params.children}
            </li>
          )}
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
              InputLabelProps={{ style: { color: "#6A172E" } }}
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
    </div>
  );
};

export default BuildingDropdownSelect;
