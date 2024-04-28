import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import DeletableCheckbox from "../DeletableCheckbox";
import WritableCheckbox from "../WritableCheckbox";
import { InspectItemProps } from "../../../../../ts/interfaces/roomItem.interfaces";

export interface CategoryCheckboxProps {
  items: InspectItemProps[];
  onCheck: any;
  onDelete: any;
  onAdd: any;
  disabled: boolean;
}

const CategoryCheckbox = (props: CategoryCheckboxProps) => {
  const { items, onCheck, onDelete, onAdd, disabled } = props;

  return (
    <Grid container spacing={2} direction="row">
      {items.map(
        (item, index) =>
          !item.is_deleted && (
            <Grid item xs={6} lg={4}>
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
