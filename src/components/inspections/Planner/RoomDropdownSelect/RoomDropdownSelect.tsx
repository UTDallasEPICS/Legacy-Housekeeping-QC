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

const OPTION_LIMIT = 100;

const RoomDropdownSelect = (props: RoomDropdownSelectProps) => {
  const { options, selected, handleChange } = props;
  return (
    <FormControl fullWidth>
      <Autocomplete
        options={options}
        getOptionLabel={(option) =>
          option.room_id === -1
            ? ""
            : "Room " + option.room_name + " in " + option.building_name
        }
        groupBy={(option) => option.building_name + " Building"}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              placeholder="Type a room name"
              label="Select a room"
              InputLabelProps={{ style: { color: "#6A172E" } }}
            />
          );
        }}
        renderOption={(props, option, { selected }) => (
          <MenuItem key={option.room_id} {...props}>
            {"Room " + option.room_name}
            {selected && <CheckIcon color="info" />}
          </MenuItem>
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <Box
              sx={{
                backgroundColor: "lightgray",
                fontWeight: "bold",
                padding: "0.5rem",
              }}
            >
              {params.group}
            </Box>
            <ul style={{ padding: 0 }}>{params.children}</ul>
          </li>
        )}
        isOptionEqualToValue={(option, value) =>
          option.room_id === value.room_id
        }
        value={selected}
        onChange={(event, value) => handleChange(value)}
        filterOptions={createFilterOptions({
          limit: OPTION_LIMIT,
        })}
        PaperComponent={({ children }) => {
          return (
            <Paper>
              {children}
              <Box sx={{ padding: "1rem", backgroundColor: "lightgray" }}>
                <Typography textAlign={"center"} fontStyle={"italic"}>
                  ... {options.length - OPTION_LIMIT} more rooms. Please type to
                  search
                </Typography>
              </Box>
            </Paper>
          );
        }}
      />
    </FormControl>
  );
};

export default RoomDropdownSelect;
