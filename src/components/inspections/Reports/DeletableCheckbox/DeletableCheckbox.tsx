import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DeletableCheckboxProps } from "./props";

const DeletableCheckbox = (props: DeletableCheckboxProps) => {
  const { name, checked, disabled, onChange, onDelete } = props;
  return (
    <Box display={"flex"} alignItems={"center"}>
      {!disabled && (
        <IconButton sx={{ cursor: "pointer" }} onClick={onDelete}>
          <CancelIcon />
        </IconButton>
      )}
      <FormControlLabel
        control={
          <Checkbox disabled={disabled} checked={checked} onChange={onChange} />
        }
        label={<Typography fontWeight={"light"} color="primary">{name}</Typography>}
      />
    </Box>
  );
};

export default DeletableCheckbox;
