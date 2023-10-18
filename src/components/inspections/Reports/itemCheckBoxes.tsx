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
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Sink"
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Floor"
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Handrail"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ItemCheckBoxes;
