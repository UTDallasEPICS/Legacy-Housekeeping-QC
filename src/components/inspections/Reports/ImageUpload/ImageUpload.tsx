import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomPics,
  setRoomPics,
} from "../../../../../slices/InspectionMakerSlice";
import CloudIcon from "@mui/icons-material/Cloud";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"; // Add axios for API calls
import  Imageupload  from "./AWSUpload"

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
  const dispatch = useDispatch();
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
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  onClick={() => {
                    dispatch(
                      setRoomPics(roomPics.filter((_, i) => i !== index))
                    );
                  }}
                >
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
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const files = [...event.target.files];
    
    // If no files selected, return
    if (files.length === 0) return;

    setUploading(true); // Set uploading state to true
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          const { fileUrl } = response.data;

          // Add the uploaded image's URL to Redux state
          dispatch(
            setRoomPics([
              ...roomPics,
              {
                name: file.name,
                url: fileUrl, // Use the S3 URL returned from the API
              },
            ])
          );
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading file");
      }
    }
    setUploading(false); // Set uploading state to false
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ImageUploadHeader disabled={disabled} onUpload={handleFileUpload} />
      {uploading && <Typography>Uploading...</Typography>}
      <ImageGrid roomPics={roomPics} />
    </Box>
  );
};

export default ImageUpload;
