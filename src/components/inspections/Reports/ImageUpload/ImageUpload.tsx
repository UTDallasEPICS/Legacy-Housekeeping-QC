import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoomPics, setRoomPics } from "../InspectionMakerSlice";
import CloudIcon from "@mui/icons-material/Cloud";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ImageUploadHeader = ({ disabled, onUpload }) => {
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
        Images
      </Typography>
      {!disabled && (
        <>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="inspection-image-upload"
            multiple
            type="file"
            onChange={onUpload}
          />
          <label htmlFor="inspection-image-upload">
            <Button
              variant="outlined"
              component="span"
              color="primary"
              startIcon={<CloudIcon />}
            >
              Upload
            </Button>
          </label>
        </>
      )}
    </Box>
  );
};

const ImageGrid = ({ roomPics }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}
    >
      {roomPics.map((pic, index) => {
        return (
          <ImageListItem key={pic.name + index} sx={{ aspectRatio: "1/1" }}>
            <img src={pic.url} alt={pic.name} />
            <ImageListItemBar
              title={pic.name}
              actionIcon={
                <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
                  <DeleteForeverIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        );
      })}
    </Box>
  );
};

const ImageUpload = ({ disabled }: { disabled: boolean }) => {
  const dispatch = useDispatch();
  const roomPics = useSelector(getRoomPics);
  const handleFileUpload = (event) => {
    const files = [...event.target.files];
    dispatch(
      setRoomPics([
        ...roomPics,
        ...files.map((file) => {
          return {
            name: file.name,
            url: URL.createObjectURL(file),
          };
        }),
      ])
    );
  };
  return (
    <Box>
      <ImageUploadHeader disabled={disabled} onUpload={handleFileUpload} />
      <ImageGrid roomPics={roomPics} />
    </Box>
  );
};

export default ImageUpload;
