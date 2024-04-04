import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Inspect_Status, Item } from "@prisma/client";
import { Cloud } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getInspectionSelectionProps } from "../../../../slices/inspectionSelectionSlice";
import BackButton from "../../globalComponents/backButton";
import CategoryCheckbox from "./categoryCheckbox";
import CommentBox from "./commentBox";
import {
  InspectItemProps,
  toInspectItemProps,
} from "../../../../ts/interfaces/roomItem.interfaces";

const InspectionMaker = () => {
  const router = useRouter();
  const inspectionProps = useSelector(getInspectionSelectionProps);
  const inspected = inspectionProps.inspect_status === Inspect_Status.INSPECTED;
  const [items, setItems] = useState({});
  const [comment, setComment] = useState();
  const [extra, setExtra] = useState(0);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleExtraChange = (event) => {
    setExtra(event.target.value);
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

  const handleSubmission = async () => {
    const itemUpdateRes = await fetch(
      "http://localhost:3000/api/rubric/updateOnRubric",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: convertCategoriesToItems(items),
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
          extra_score: extra,
          score: Math.floor(Math.random() * 100), // Random score for now, waiting for the score API
        }),
      }
    );
    const rubricUpdateData = await rubricUpdateRes.json();
    console.log(rubricUpdateData);

    router.push("/admin/inspections");
  };

  const setItemInCategory = (category: string, item: InspectItemProps) => {
    setItems({
      ...items,
      [category]: items[category].map((other) => {
        return other.id === item.id ? item : other;
      }),
    });
  };

  const setItemsInCategory = (
    category: string,
    modified_items: InspectItemProps[]
  ) => {
    setItems({ ...items, [category]: modified_items });
  };

  const addItemInCategory = (category: string, name: string) => {
    setItems({
      ...items,
      [category]: [
        ...items[category],
        {
          id: -1,
          name: name,
          category: category,
          weight: 1,
          is_checked: true,
          is_deleted: false,
          room_id: inspectionProps.room_id,
          quantitative_id: inspectionProps.rubric_id,
        } as InspectItemProps,
      ],
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/rubric/items/" + inspectionProps.rubric_id);
      const itemsData: Item[] = await res.json();
      // Separate the items into categories
      let categories: { [key: string]: Item[] } = {};
      itemsData.forEach((item) => {
        if (categories[item.category] === undefined) {
          categories[item.category] = [];
        }
        categories[item.category].push(toInspectItemProps(item));
      });
      setItems(categories);
    };
    fetchItems();
  }, []);

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
      <MakerHeader inspected={inspected} props={inspectionProps} />

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyItems: "space-between",
          gap: "2rem",
        }}
        maxWidth={false}
      >
        <Container sx={{ flexGrow: 1, flexBasis: 0 }} disableGutters>
          {Object.keys(items).map((category) => (
            <CategoryCheckbox
              key={category}
              items={items[category]}
              category={category}
              setItem={(item: InspectItemProps) =>
                setItemInCategory(category, item)
              }
              setItems={(modified_items: InspectItemProps[]) =>
                setItemsInCategory(category, modified_items)
              }
              addItem={(name: string) => addItemInCategory(category, name)}
              disabled={inspected}
            />
          ))}
        </Container>
        <Stack flexDirection="column" flexGrow={1} flexBasis={0} spacing="1rem">
          <CommentBox
            disabled={inspected}
            comment={inspected ? inspectionProps.comment : comment}
            setComment={handleCommentChange}
          />
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
              disabled={inspected}
              hiddenLabel
              type="number"
              variant="standard"
              size="small"
              sx={{ width: "5rem", mt: 0 }}
              value={inspected ? inspectionProps.extra_score : extra}
              onChange={handleExtraChange}
            />
          </Box>
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
            {!inspected && (
              <Button variant="outlined" startIcon={<Cloud />}>
                Upload
              </Button>
            )}
          </Box>
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

const MakerHeader = ({ inspected, props }) => {
  return (
    <Stack spacing="0rem" flexDirection="column">
      <Typography
        variant="h3"
        align="center"
        color="primary"
        textTransform="capitalize"
        fontWeight="bold"
      >
        Inspection {inspected ? "Maker" : "Report"}
      </Typography>

      <Typography variant="h6" align="center" color="primary">
        <b>Room</b> {props.room_name} on <b>Floor</b> {props.floor_number} in{" "}
        <b>{props.building_name} Building</b>
      </Typography>

      <Typography variant="h6" align="center" color="primary">
        Cleaned by{" "}
        {props.team_members
          .map((member) => member.first_name + " " + member.last_name)
          .join(", ")}
      </Typography>
    </Stack>
  );
};

export default InspectionMaker;
