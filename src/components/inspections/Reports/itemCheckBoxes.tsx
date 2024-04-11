import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const ItemCheckBoxes = () => {
  const checkUpdate = () => {};

  return (
    <FormControl sx={{ pl: 2}}>
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
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Bedroom"
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Floor Boards"
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Ceiling Fans"
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Counter Tops"
          labelPlacement="end"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkUpdate} />}
          label="Kitchen"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ItemCheckBoxes;