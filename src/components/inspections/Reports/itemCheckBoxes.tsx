import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const ItemCheckBoxes = () => {
  const checkUpdate = () => {};

  return (
    <FormControl sx={{ pt: 5 }}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Toilet"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Sink"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Floor"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Handrail"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ItemCheckBoxes;
