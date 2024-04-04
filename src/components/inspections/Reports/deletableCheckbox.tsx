import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
const DeletableCheckbox = ({ item, disabled, onChange, onDelete }) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      {!disabled && (
        <IconButton sx={{ cursor: "pointer" }}>
          <CancelIcon onClick={onDelete} />
        </IconButton>
      )}
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
            checked={item.is_checked}
            onChange={onChange}
          />
        }
        label={<Typography>{item.name}</Typography>}
      />
    </Box>
  );
};

export default DeletableCheckbox;
