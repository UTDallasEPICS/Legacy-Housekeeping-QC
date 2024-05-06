import AddTaskIcon from "@mui/icons-material/AddTask";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";

const WritableCheckbox = ({ onInsert }) => {
  const [newItem, setNewItem] = useState("");
  return (
    <Box display={"flex"} alignItems={"center"}>
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => {
          newItem ? onInsert(newItem) : null;
          setNewItem("");
        }}
      >
        <AddTaskIcon />
      </IconButton>
      <TextField
        variant="standard"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
        placeholder="Add an item"
      />
    </Box>
  );
};

export default WritableCheckbox;
