import { Card, Grid, Typography } from "@mui/material";
import { CompleteGrid, LockedGrid, RemainingGrid } from "../..";

const GridComponent = ({ reports }) => {
  let notClean = [];
  let clean = [];
  reports.map((report) => {
    report.cleaned ? clean.push(report) : notClean.push(report);
  });

  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={2}
        spacing={6}
        sx={{ pt: 24, px: 24, pb: 0 }}
      >
        <Grid item xs={4}>
          <Typography>Complete:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Remaining:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Locked:</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        rowSpacing={2}
        spacing={6}
        sx={{ pt: 2, px: 24 }}
      >
        <CompleteGrid reports={clean} />
        <RemainingGrid reports={notClean} />
        <LockedGrid reports={notClean} />
      </Grid>
    </>
  );
};

export default GridComponent;
