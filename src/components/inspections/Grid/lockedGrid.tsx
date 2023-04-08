import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../..";

const lockedGrid = () => {
  return (
    <>
        <Grid 
        container 
        item
        direction="column"
        xs={4}
        rowSpacing={2}
        >
            <ReportComponent/>
            <ReportComponent/>
            <ReportComponent/>
        </Grid>
    </>
  );
}

export default lockedGrid