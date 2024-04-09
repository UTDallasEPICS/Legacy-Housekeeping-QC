import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export interface DeletableCheckboxProps {
  name: string;
  checked: boolean;
  disabled: boolean;
  onChange: any;
  onDelete: any;
}

const DeletableCheckbox = (props: DeletableCheckboxProps) => {
  const { name, checked, disabled, onChange, onDelete } = props;
  return (
    <Box display={"flex"} alignItems={"center"}>
      {!disabled && (
        <IconButton sx={{ cursor: "pointer" }}>
          <CancelIcon onClick={onDelete} />
        </IconButton>
      )}
      <FormControlLabel
        control={
          <Checkbox disabled={disabled} checked={checked} onChange={onChange} />
        }
        label={<Typography>{name}</Typography>}
      />
    </Box>
  );
};

export default DeletableCheckbox;
