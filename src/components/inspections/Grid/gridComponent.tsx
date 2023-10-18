import { Card, Grid, Typography } from "@mui/material";
import { CompleteGrid, LockedGrid, RemainingGrid } from "../..";

const GridComponent = ({ reports }) => {
  let notClean = [];
  let clean = [];
  let locked = [];
  reports?.map((report) => {
    report.locked ? locked.push(report) : report.cleaned ? clean.push(report) : notClean.push(report);
  });

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        direction="column"
        rowSpacing={2}
        spacing={6}
        sx={{ pt: 2, px: 2, pb: 0 }}
      >
        <Grid item xs={4}>
          <Typography>Complete:</Typography>
          <CompleteGrid reports={clean} />
        </Grid>
        <Grid item xs={4}>
          <Typography>Remaining:</Typography>
          <RemainingGrid reports={notClean} />
        </Grid>
        <Grid item xs={4}>
          <Typography>Locked:</Typography>
          <LockedGrid reports={locked} />
        </Grid>
      </Grid>

      {/* <Grid
        container
        justifyContent="center"
        rowSpacing={2}
        spacing={6}
        sx={{ pt: 2, px: 24 }}
      >
        <CompleteGrid reports={clean} />
        <RemainingGrid reports={notClean} />
        <LockedGrid reports={locked} />
      </Grid> */}
    </>
  );
};

export default GridComponent;
