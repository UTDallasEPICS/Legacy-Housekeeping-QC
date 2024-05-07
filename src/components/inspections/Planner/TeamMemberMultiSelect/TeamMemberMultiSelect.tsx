import {
  Autocomplete,
  Chip,
  FormControl,
  MenuItem,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EllipsisTextChip from "../EllipsisTextChip";
import { TeamMemberMultiSelectProps } from "./props";

const TeamMemberMultiSelect = (props: TeamMemberMultiSelectProps) => {
  const { options, selected, handleChange } = props;
  return (
    <FormControl fullWidth variant="standard">
      <Autocomplete
        limitTags={2}
        multiple
        disableCloseOnSelect
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              placeholder="Name"
              label="Select team members"
            />
          );
        }}
        renderOption={(props, option, { selected }) => (
          <MenuItem
            {...props}
            key={option.name}
            sx={{ display: "flex", gap: "1rem" }}
          >
            {option.name}
            {selected && <CheckIcon color="info" />}
          </MenuItem>
        )}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip
              key={option.name}
              {...getTagProps({ index })}
              label={
                <EllipsisTextChip width="60px">{option.name}</EllipsisTextChip>
              }
            />
          ));
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        value={selected}
        onChange={(event, value) => handleChange(value)}
      />
    </FormControl>
  );
};

export default TeamMemberMultiSelect;
