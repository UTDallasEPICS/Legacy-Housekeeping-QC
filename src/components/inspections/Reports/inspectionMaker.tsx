import { Button, Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Inspect_Status } from "@prisma/client";
import { useRouter } from "next/router";
import BackButton from "../../globalComponents/backButton";
import CommentBox from "./CommentBox";
import { InspectItemProps } from "../../../../ts/interfaces/roomItem.interfaces";
import ItemChecklist from "./ItemChecklist";
import { getComment, getExtraScore, getItems } from "./InspectionMakerSlice";
import InspectionHeader from "./InspectionHeader";
import ExtraScoreInput from "./ExtraScoreInput";
import ImageUpload from "./ImageUpload";
import { Suspense } from "react";
import Loading from "../../loader/Loading";

const InspectionMaker = ({ inspectionProps }) => {
  const router = useRouter();
  const inspected = inspectionProps.inspect_status === Inspect_Status.INSPECTED;

  const items = convertCategoriesToItems(useSelector(getItems));
  const comment = useSelector(getComment);
  const extra_score = useSelector(getExtraScore);

  const handleSubmission = async () => {
    const itemUpdateRes = await fetch(
      "http://localhost:3000/api/rubric/updateOnRubric",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          rubric_id: inspectionProps.rubric_id,
          room_id: inspectionProps.room_id,
        }),
      }
    );
    //const itemUpdateData = await itemUpdateRes.json();
    //console.log(itemUpdateData);

    const rubricUpdateRes = await fetch(
      "http://localhost:3000/api/roomReport/update",
      {
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
          score: Math.floor(Math.random() * 100), // Random score for now, waiting for the score API
        }),
      }
    );
    //const rubricUpdateData = await rubricUpdateRes.json();
    //console.log(rubricUpdateData);

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
      <BackButton pageToGoBack={"inspections"} />
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
