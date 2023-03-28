import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../..";

const remainingGrid = () => {
  return (
    <>
        <Grid 
        container 
        item
        direction="column"
        xs={4}
        rowSpacing={2}
        >
            <Typography>Remaining:</Typography>
            <ReportComponent/>
            <ReportComponent/>
        </Grid>
    </>
  );
}

export default remainingGrid