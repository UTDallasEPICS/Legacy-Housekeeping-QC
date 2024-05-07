import { Box, TextField, Typography } from "@mui/material";
import {
  getExtraScore,
  setExtraScore,
} from "../../../../../slices/InspectionMakerSlice";
import { useDispatch, useSelector } from "react-redux";

const ExtraScoreInput = ({ disabled }: { disabled: boolean }) => {
  const dispatch = useDispatch();
  const extra_score = useSelector(getExtraScore);
  const handleExtraScoreChange = (event) => {
    dispatch(setExtraScore(event.target.value));
  };

  return (
    <Box
      sx={{
        gap: "2rem",
        alignItems: "center",
        flexDirection: "row",
        display: "flex",
      }}
    >
      <Typography textTransform="uppercase" fontWeight="bold">
        Extra
      </Typography>
      <TextField
        disabled={disabled}
        hiddenLabel
        type="number"
        variant="standard"
        size="small"
        sx={{ width: "5rem", mt: 0 }}
        value={extra_score}
        onChange={handleExtraScoreChange}
      />
    </Box>
  );
};

export default ExtraScoreInput;
