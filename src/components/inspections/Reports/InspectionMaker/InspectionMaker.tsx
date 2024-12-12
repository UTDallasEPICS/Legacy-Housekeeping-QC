import { Button, Container, Stack, Grid, Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Inspect_Status } from "@prisma/client";
import { useRouter } from "next/router";
import BackButton from "../../../globalComponents/backButton";
import CommentBox from "../CommentBox";
import ItemChecklist from "../ItemChecklist";
import {
  getComment,
  getExtraScore,
  getItems,
} from "../../../../../slices/InspectionMakerSlice";
import InspectionHeader from "../InspectionHeader";
import ExtraScoreInput from "../ExtraScoreInput";
import ImageUpload from "../ImageUpload";
import { InspectItemProps } from "../ItemChecklist/props";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const InspectionMaker = ({ inspectionProps }) => {
  const router = useRouter();
  const inspected = inspectionProps.inspect_status === Inspect_Status.INSPECTED;

  const items = convertCategoriesToItems(useSelector(getItems));
  const comment = useSelector(getComment);
  const extra_score = useSelector(getExtraScore);

  const [contentUrls, setContentUrls] = useState<string[]>([]);
  const [images, setImages] = useState<{ id: number, url: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/getImages?inspection_id=${inspectionProps.id}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setImages(data.map((image: { id: number, url: string }) => ({ id: image.id, url: image.url })));
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, [inspectionProps.id]);

  const handleSubmission = async () => {
    const itemUpdateRes = await fetch("/api/rubric/updateOnRubric", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        rubric_id: inspectionProps.rubric_id,
        room_id: inspectionProps.room_id,
      }),
    });

    const scoreUpdateRes = await fetch("/api/roomReport/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rubric_id: inspectionProps.rubric_id,
        extra_score: extra_score,
      }),
    });
    const scoreUpdateData = await scoreUpdateRes.json();

    const rubricUpdateRes = await fetch("/api/roomReport/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: inspectionProps.id,
        members_ids: inspectionProps.team_members.map((member) => member.id),
        room_pics: null,
        clean_status: "CLEANED",
        comment: comment,
        extra_score: extra_score,
        score: scoreUpdateData.score,
      }),
    });

    router.push("/admin/inspections");
  };

  const handleImageUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.onchange = async (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        const urls = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileType = file.type;
          const response = await fetch(`/api/upload-url?fileType=${fileType}&fileLength=${file.size}`);
          const { uploadUrl, contentUrl, key } = await response.json();
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": fileType,
            },
            body: file,
          });
          console.log("File uploaded successfully:", key);
          urls.push(contentUrl);

          // Save the image URL to the database
          await fetch('/api/saveImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: contentUrl,
              inspection_id: inspectionProps.id, // Pass the appropriate inspection ID
            }),
          });
        }
        setContentUrls(urls);

        // Fetch updated images
        const updatedImages = await fetch(`/api/getImages?inspection_id=${inspectionProps.id}`);
        const updatedData = await updatedImages.json();
        if (Array.isArray(updatedData)) {
          setImages(updatedData.map((image: { id: number, url: string }) => ({ id: image.id, url: image.url })));
        } else {
          console.error("Unexpected response format:", updatedData);
        }
      }
    };
    fileInput.click();
  };

  const handleImageDelete = async (id: number) => {
    try {
      await fetch(`/api/deleteImage?id=${id}`, {
        method: 'DELETE',
      });
      setImages(images.filter(image => image.id !== id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "stretch",
        padding: { xs: "1rem", md: "2rem" },
      }}
      disableGutters
      maxWidth={false}
    >
      <Container sx={{ justifyContent: "flex-start", margin: 0 }}>
        <BackButton pageToGoBack={"inspections"} />
      </Container>
      <InspectionHeader
        inspected={inspected}
        room_name={inspectionProps.room_name}
        floor_number={inspectionProps.floor_number}
        building_name={inspectionProps.building_name}
        team_members={inspectionProps.team_members}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyItems: "space-between",
          gap: "2rem",
        }}
        maxWidth={false}
      >
        <ItemChecklist
          room_id={inspectionProps.room_id}
          rubric_id={inspectionProps.rubric_id}
          disabled={inspected}
        />

        <Stack flexDirection="column" flexGrow={1} flexBasis={0} spacing="1rem">
          <CommentBox disabled={inspected} />
          <ExtraScoreInput disabled={inspected} />
          <ImageUpload disabled={inspected} />
          {!inspected && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmission}
            >
              Submit
            </Button>
          )}
          {!inspected && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageUpload}
            >
              Upload Images
            </Button>
          )}
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div style={{ position: 'relative' }}>
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    <img src={image.url} alt={`Uploaded content ${index}`} style={{ maxWidth: "100%" }} />
                  </a>
                  {!inspected && (
                    <>
                      <IconButton
                        onClick={() => handleImageDelete(image.id)}
                        style={{ position: 'absolute', top: 0, right: 0, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <a href={image.url} download={`image-${index}.jpg`}>
                        <IconButton
                          style={{ position: 'absolute', top: 0, right: 40, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        >
                          <SaveIcon />
                        </IconButton>
                      </a>
                    </>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Container>
  );
};

const convertCategoriesToItems = (categories: {
  [key: string]: InspectItemProps[];
}) => {
  let items: InspectItemProps[] = [];
  Object.keys(categories).forEach((category) => {
    items = items.concat(categories[category]);
  });
  return items;
};

export default InspectionMaker;