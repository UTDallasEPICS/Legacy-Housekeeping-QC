import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../../src/components";

const CompleteGrid = ({ reports }) => {
  return (
    <>
      <Grid
        container
        item
        direction="column"
        xs={4}
        rowSpacing={2}
        sx={{ width: "max-content", overflow: "visible", p: 2 }}
      >
        {reports?.map((report) => (
          <ReportComponent report={report} />
        ))}
      </Grid>
    </>
  );
};

export default CompleteGrid;
