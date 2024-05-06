import { Grid } from "@mui/material";
import DeletableCheckbox from "../DeletableCheckbox";
import WritableCheckbox from "../WritableCheckbox";
import { CategoryCheckboxProps } from "./props";

const CategoryCheckbox = (props: CategoryCheckboxProps) => {
  const { items, onCheck, onDelete, onAdd, disabled } = props;

  return (
    <Grid container spacing={2} direction="row">
      {items.map(
        (item, index) =>
          !item.is_deleted && (
            <Grid item xs={6} lg={4} key={item.name + index}>
              <DeletableCheckbox
                name={item.name}
                checked={item.is_checked}
                disabled={disabled}
                onChange={onCheck(item)}
                onDelete={onDelete(item)}
              />
            </Grid>
          )
      )}
      <Grid item xs={6} lg={4}>
        {!disabled && <WritableCheckbox onInsert={onAdd} />}
      </Grid>
    </Grid>
  );
};

export default CategoryCheckbox;
