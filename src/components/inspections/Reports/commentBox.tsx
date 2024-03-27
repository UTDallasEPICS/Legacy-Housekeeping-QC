import { Box, TextField, Typography } from "@mui/material";

const CommentBox = ({ comment, setComment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography textTransform={"uppercase"} fontWeight="bold">
        Comments:
      </Typography>
      <TextField
        multiline
        rows={4}
        value={comment}
        onChange={setComment}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default CommentBox;
