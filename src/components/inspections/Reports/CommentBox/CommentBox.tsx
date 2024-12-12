import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getComment,
  setComment,
} from "../../../../../slices/InspectionMakerSlice";

const CommentBox = ({ disabled }: { disabled: boolean }) => {
  const dispatch = useDispatch();
  const comment = useSelector(getComment);
  const handleCommentChange = (event) => {
    dispatch(setComment(event.target.value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography textTransform={"uppercase"} fontWeight="bold" color="primary">
        Comments:
      </Typography>
      <TextField
        disabled={disabled}
        multiline
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default CommentBox;
