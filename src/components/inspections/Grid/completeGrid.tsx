import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../..";

const CompleteGrid = ({ reports }) => {
  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignContent={"center"}
        justifyContent={"center"}
        xs={0}
        rowSpacing={2}
        sx={{ overflow: "visible", height: "min-content" }}
      >
        {reports?.map((report) => (
          <ReportComponent report={report} />
        ))}
      </Grid>
    </>
  );
};

export default CompleteGrid;
