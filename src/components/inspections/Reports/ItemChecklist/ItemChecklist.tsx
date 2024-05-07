import { Box } from "@mui/material";
import CategoryCheckbox from "../CategoryCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setItems } from "../../../../../slices/InspectionMakerSlice";
import CategoryHeader from "../CategoryHeader";
import { InspectItemProps, ItemChecklistProps, generateNewItem } from "./props";

export default function ItemChecklist(props: ItemChecklistProps) {
  const { rubric_id, room_id, disabled } = props;
  const dispatch = useDispatch();
  const items = useSelector(getItems);

  const setAllItemsInCategory = (
    category: string,
    newItems: InspectItemProps[]
  ) => {
    dispatch(setItems({ ...items, [category]: newItems }));
  };

  const setOneItemInCategory = (
    category: string,
    newItem: InspectItemProps
  ) => {
    dispatch(
      setItems({
        ...items,
        [category]: items[category].map((other) => {
          return other.key === newItem.key ? newItem : other;
        }),
      })
    );
  };

  const addOneItemInCategory = (
    category: string,
    newItem: InspectItemProps
  ) => {
    dispatch(
      setItems({
        ...items,
        [category]: [...items[category], newItem],
      })
    );
  };

  const onCheckAll =
    (category: string) => (items: InspectItemProps[]) => (event: any) => {
      setAllItemsInCategory(
        category,
        items.map((item) => {
          return { ...item, is_checked: event.target.checked };
        })
      );
    };
  const onCheckSingle =
    (category: string) => (item: InspectItemProps) => (event: any) => {
      setOneItemInCategory(category, {
        ...item,
        is_checked: event.target.checked,
      });
    };
  const onDeleteSingle =
    (category: string) => (item: InspectItemProps) => () => {
      setOneItemInCategory(category, { ...item, is_deleted: true });
    };
  const onAddSingle = (category: string) => (name: string) => {
    const key = items[category].length;
    addOneItemInCategory(
      category,
      generateNewItem({ key, name, category, room_id, rubric_id })
    );
  };

  return (
    <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
      {Object.keys(items).map((category) => (
        <Box
          key={category}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <CategoryHeader
            items={items[category]}
            category={category}
            onCheck={onCheckAll(category)}
            disabled={disabled}
          />

          <CategoryCheckbox
            items={items[category]}
            onCheck={onCheckSingle(category)}
            onDelete={onDeleteSingle(category)}
            onAdd={onAddSingle(category)}
            disabled={disabled}
          />
        </Box>
      ))}
    </Box>
  );
}
