import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../..";

const completeGrid = () => {
  return (
    <>
        <Grid 
        container 
        item
        direction="column"
        xs={4}
        rowSpacing={2}
        >
            <Typography>Complete:</Typography>
            <ReportComponent/>  
            <ReportComponent/>
        </Grid>
    </>
  );
}

export default completeGrid