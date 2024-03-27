import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BackButton } from "../../src/components";
import { useSelector } from "react-redux";
import { getInspectionSelectionProps } from "../../slices/inspectionSelectionSlice";
import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import CategoryCheckbox from "../../src/components/inspections/Reports/categoryCheckbox";
import CommentBox from "../../src/components/inspections/Reports/commentBox";
import { Cloud } from "@mui/icons-material";

const inspectionMaker = () => {
  const inspectionProps = useSelector(getInspectionSelectionProps);
  const [items, setItems] = useState({});
  const [comment, setComment] = useState("");
  const [extra, setExtra] = useState(0);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleExtraChange = (event) => {
    setExtra(event.target.value);
  };

  const handleSubmission = async () => {
    const res = await fetch("/api/inspection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inspection_id: inspectionProps.inspection_id,
        comment: comment,
        extra: extra,
        items: items,
      }),
    });
    console.log(await res.json());
  };

  const setItemInCategory = (category: string, item: Item) => {
    setItems({
      ...items,
      [category]: items[category].map((other) => {
        return other.id === item.id ? item : other;
      }),
    });
  };

  const setItemsInCategory = (category: string, modified_items: Item[]) => {
    setItems({ ...items, [category]: modified_items });
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
        categories[item.category].push(item);
      });
      setItems(categories);
    };
    fetchItems();
  }, []);

  return (
    <>
      <Stack spacing="2rem" flexDirection="column" p={2}>
        <BackButton pageToGoBack={"inspections"} />
        <Stack spacing="0rem" flexDirection="column">
          <Typography
            variant="h3"
            align="center"
            color="primary"
            textTransform="capitalize"
            fontWeight="bold"
          >
            Inspection Maker
          </Typography>

          <Typography variant="h6" align="center" color="primary">
            <b>Room</b> {inspectionProps.room_name} on <b>Floor</b>{" "}
            {inspectionProps.floor_number} in{" "}
            <b>{inspectionProps.building_name} Building</b>
          </Typography>

          <Typography variant="h6" align="center" color="primary">
            Cleaned by{" "}
            {inspectionProps.team_members
              .map((member) => member.first_name + " " + member.last_name)
              .join(", ")}
          </Typography>
        </Stack>

        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "2rem",
          }}
        >
          <Container sx={{ flexGrow: 1, flexBasis: 0 }} disableGutters>
            {Object.keys(items).map((category) => (
              <CategoryCheckbox
                key={category}
                items={items[category]}
                category={category}
                setItem={(item: Item) => setItemInCategory(category, item)}
                setItems={(modified_items: Item[]) =>
                  setItemsInCategory(category, modified_items)
                }
              />
            ))}
          </Container>
          <Stack
            flexDirection="column"
            flexGrow={1}
            flexBasis={0}
            spacing="1rem"
          >
            <CommentBox comment={comment} setComment={handleCommentChange} />
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
                hiddenLabel
                type="number"
                variant="standard"
                size="small"
                sx={{ width: "5rem", mt: 0 }}
                value={extra}
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
              <Button variant="outlined" startIcon={<Cloud />}>
                Upload
              </Button>
            </Box>

            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default inspectionMaker;
