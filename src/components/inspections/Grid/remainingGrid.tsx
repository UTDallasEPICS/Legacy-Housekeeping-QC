import { Grid } from "@mui/material";
import { ReportComponent} from "../..";

const RemainingGrid = ({ reports }) => {
  return (
    <>
      <Grid
        container
        item
        direction="column"
        xs={4}
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

export default RemainingGrid;
