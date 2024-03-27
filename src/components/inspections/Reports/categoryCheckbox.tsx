import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Item } from "@prisma/client";

const CategoryCheckbox = ({
  items,
  category,
  setItem,
  setItems,
}: {
  items: Item[];
  category: string;
  setItem: any;
  setItems: any;
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
        {items.map((item, index) => (
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.is_checked}
                  onChange={(event) => {
                    setItem({ ...item, is_checked: event.target.checked });
                  }}
                />
              }
              label={<Typography>{item.name}</Typography>}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryCheckbox;
