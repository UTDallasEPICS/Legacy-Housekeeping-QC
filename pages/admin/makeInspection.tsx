import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getInspectionSelectionProps } from "../../slices/inspectionSelectionSlice";
import {
  ItemCategoryProps,
  setComment,
  setExtraScore,
  setItems,
  setRoomPics,
} from "../../slices/InspectionMakerSlice";
import { useEffect, useState } from "react";
import { InspectionMaker, Loader, Navbar } from "../../src/components";
import {
  InspectItemProps,
  toInspectItemProps,
} from "../../src/components/inspections/Reports/ItemChecklist/props";

const makeInspection = () => {
  const dispatch = useDispatch();
  const inspectionProps = useSelector(getInspectionSelectionProps);
  dispatch(setComment(inspectionProps.comment ?? ""));
  dispatch(setExtraScore(inspectionProps.extra_score ?? 0));
  // Get the room pics from database after image upload and storage is implemented
  dispatch(setRoomPics([]));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemsInRubric(inspectionProps.rubric_id).then((items) => {
      // If the inspection is not inspected, add an empty "Others" category
      if (inspectionProps.inspect_status === "NOT_INSPECTED")
        items["Others"] = [];

      dispatch(setItems(items));
    });
    // Artificial loading time so the checklists can be loaded
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Loader />;

  return (
    <main>
      <CssBaseline />
      <Navbar />
      <InspectionMaker inspectionProps={inspectionProps} />
    </main>
  );
};

async function getItemsInRubric(rubric_id: number): Promise<ItemCategoryProps> {
  const res = await fetch("/api/rubric/items/" + rubric_id);
  const items = await res.json();
  return splitItemsToCategories(
    items.map((item, index) => toInspectItemProps(item, index))
  );
}

function splitItemsToCategories(items: InspectItemProps[]): ItemCategoryProps {
  let categories: ItemCategoryProps = {};
  items.forEach((item, index) => {
    if (categories[item.category] === undefined) {
      categories[item.category] = [];
    }
    categories[item.category].push(toInspectItemProps(item, index));
  });
  return categories;
}

export default makeInspection;
