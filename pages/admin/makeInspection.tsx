import { CssBaseline } from "@mui/material";
import InspectionMaker from "../../src/components/inspections/Reports/inspectionMaker";
import { useDispatch, useSelector } from "react-redux";
import { getInspectionSelectionProps } from "../../slices/inspectionSelectionSlice";
import {
  ItemCategoryProps,
  setComment,
  setExtraScore,
  setItems,
} from "../../src/components/inspections/Reports/InspectionMakerSlice";
import { Inspect_Status } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  InspectItemProps,
  toInspectItemProps,
} from "../../ts/interfaces/roomItem.interfaces";
import Loading from "../../src/components/loader/Loading";

const makeInspection = () => {
  const dispatch = useDispatch();
  const inspectionProps = useSelector(getInspectionSelectionProps);
  dispatch(setComment(inspectionProps.comment ?? ""));
  dispatch(setExtraScore(inspectionProps.extra_score ?? 0));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemsInRubric(inspectionProps.rubric_id).then((items) => {
      dispatch(setItems(items));
    });
    // Artificial loading time so the checklists can be loaded
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <CssBaseline />
        <InspectionMaker inspectionProps={inspectionProps} />
      </main>
    </>
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
