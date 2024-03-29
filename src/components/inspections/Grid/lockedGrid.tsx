import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../..";

const LockedGrid = ({ reports }) => {
  return (
    <>
      <Grid
        container
        item
        direction="column"
        xs={4}
        rowSpacing={2}
        sx={{ overflow: "auto", height: "40rem" }}
      >
        {reports?.map((report) => (
          <ReportComponent report={report} />
        ))}
      </Grid>
    </>
  );
};

export default LockedGrid;
