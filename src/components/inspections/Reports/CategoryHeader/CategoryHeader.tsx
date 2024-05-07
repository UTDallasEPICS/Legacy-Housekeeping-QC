import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { CategoryHeaderProps } from "./props";

const CategoryHeader = (props: CategoryHeaderProps) => {
  const { items, category, onCheck, disabled } = props;
  return (
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
            onChange={onCheck(items)}
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
  );
};

export default CategoryHeader;
