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
        justifyContent="center"
        alignContent={"center"}
        direction="column"
        //rowSpacing={2}
        //spacing={2}
        sx={{pt: 0, pl: 0, pb: 0, width: "100vw"}}
       >
          <Grid bgcolor={"#059033"} item xs={4} sx={{borderRadius: 5, m: 1, alignContent: "center", width: "100vw", pb: 2}}>
            <Typography fontSize={24} align="center">Completed</Typography>
            <CompleteGrid reports={clean} />
          </Grid>
          <Grid bgcolor={"lightsalmon"} item xs={4} sx={{ borderRadius: 5, m: 1, alignContent: "center", width: "100vw", pb: 2}}>
            <Typography fontSize={24} align="center">Remaining</Typography>
            <RemainingGrid reports={notClean} />
          </Grid>
          <Grid bgcolor={"lightgrey"} item xs={4} sx={{ borderRadius: 5, m: 1, alignContent: "center", width: "100vw", pb: 2}}>
            <Typography fontSize={24} align="center">Locked</Typography>
            <LockedGrid reports={locked} />
          </Grid>
      </Grid>
    </>
  );
};

export default GridComponent;
