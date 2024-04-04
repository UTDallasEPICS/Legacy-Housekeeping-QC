import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import DeletableCheckbox from "./deletableCheckbox";
import { InspectItemProps } from "../../../../ts/interfaces/roomItem.interfaces";
import WritableCheckbox from "./writableCheckbox";

const CategoryCheckbox = ({
  items,
  category,
  setItem,
  setItems,
  addItem,
  disabled,
}: {
  items: InspectItemProps[];
  category: string;
  setItem: any;
  setItems: any;
  addItem: any;
  disabled?: boolean;
}) => {
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              disabled={disabled}
              checked={items.every((item) => item.is_checked === true)}
              indeterminate={
                !items.every((item) => item.is_checked === false) &&
                !items.every((item) => item.is_checked === true)
              }
              onChange={(event) => {
                setItems(
                  items.map((item) => {
                    return { ...item, is_checked: event.target.checked };
                  })
                );
              }}
            />
          }
          label={
            <Typography textTransform="uppercase" fontWeight="bold">
              {category}
            </Typography>
          }
          labelPlacement="start"
          sx={{ ml: 0 }}
        />
        <Typography fontWeight={"light"}>Check acceptable items</Typography>
      </Box>
      <Grid container spacing={2} direction="row">
        {items.map(
          (item, index) =>
            !item.is_deleted && (
              <Grid item xs={6} lg={4}>
                <DeletableCheckbox
                  item={item}
                  disabled={disabled}
                  onChange={(event) => {
                    setItem({ ...item, is_checked: event.target.checked });
                  }}
                  onDelete={() => {
                    setItem({ ...item, is_deleted: true });
                  }}
                />
              </Grid>
            )
        )}
        <Grid item xs={6} lg={4}>
          {!disabled && <WritableCheckbox onInsert={addItem} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryCheckbox;
