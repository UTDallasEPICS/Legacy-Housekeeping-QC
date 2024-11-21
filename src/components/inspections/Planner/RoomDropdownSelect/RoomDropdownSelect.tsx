import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Paper,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { RoomDropdownSelectProps } from "./props";
import { useState } from "react";
import { useEffect } from "react";

const OPTION_LIMIT = 100;

const RoomDropdownSelect = (prop: RoomDropdownSelectProps) => {
  const roomOptions = prop.options;
  const selected = prop.selected;
  const handleSelect = prop.handleChange;
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]);

  useEffect(() => {
    console.log(selectedRoom);
    handleSelect(selectedRoom);
  }, [selectedRoom]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        //Defines the rooms that can be selected from building Dropdown Select
        options={roomOptions}
        //No groupBy needed since grouping was done in building dropdown select
        getOptionLabel={(option) => option.room_name}
        //Should be the placeholder text when displayed
        value={selectedRoom}
        onChange={(event, value) => {
          setSelectedRoom(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Select a room"
            label="Select a room"
            InputLabelProps={{ style: { color: "#6A172E" } }}
          />
        )}
      />
    </FormControl>
  );
};

export default RoomDropdownSelect;
