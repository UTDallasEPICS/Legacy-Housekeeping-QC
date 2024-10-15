import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CleanType } from "@prisma/client";
import { CleanTypeRadioGroupProps } from "./props";

const CleanTypeRadioGroup = (props: CleanTypeRadioGroupProps) => {
  const { selected, handleChange } = props;
  return (
    <FormControl sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <FormLabel
        sx={{ display: "flex", alignItems: "center", fontWeight: "bold", color: "#6A172E" }}
      >
        Clean Type
      </FormLabel>
      <RadioGroup
        row
        value={selected}
        onChange={(event) => handleChange(event.target.value as CleanType)}
      >
        {Object.values(CleanType).map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={<Radio />}
            label={type[0] + type.slice(1).toLowerCase()}

          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CleanTypeRadioGroup;
