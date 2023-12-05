import { Grid } from "@mui/material";
import { ReportComponent } from "../..";

const RemainingGrid = ({ reports }) => {
  return (
    <>
      <Grid
        container
        item
        direction="column"
        xs={4}
        rowSpacing={2}
        sx={{ width: "min-content",overflow: "visible", p: 2 }}
      >
        {reports?.map((report) => (
          <ReportComponent report={report} />
        ))}
      </Grid>
    </>
  );
};

export default RemainingGrid;
