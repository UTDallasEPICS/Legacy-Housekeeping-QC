import { Button, Container, Stack } from "@mui/material";
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
import { useState } from "react";

const InspectionMaker = ({ inspectionProps }) => {
  const router = useRouter();
  const inspected = inspectionProps.inspect_status === Inspect_Status.INSPECTED;

  const items = convertCategoriesToItems(useSelector(getItems));
  const comment = useSelector(getComment);
  const extra_score = useSelector(getExtraScore);

  const [contentUrl, setContentUrl] = useState<string | null>(null);

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
              onClick={async () => {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.onchange = async (event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
                  if (file) {
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
                    setContentUrl(contentUrl);
                  }
                };
                fileInput.click();
              }}
            >
              Upload Image
            </Button>
          )}
          {contentUrl && (
            <div>
              <img src={contentUrl} alt="Uploaded content" style={{ maxWidth: "100%" }} />
              <p>
                <a href={contentUrl} target="_blank" rel="noopener noreferrer">
                  View Uploaded Image
                </a>
              </p>
            </div>
          )}
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