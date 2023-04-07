import { Grid, Typography } from "@mui/material";
import { ReportComponent } from "../..";

const remainingGrid = () => {
  return (
    <>
      <Grid container item direction="column" xs={4} rowSpacing={2}>
        <ReportComponent
          buildingId="Building B"
          roomId="Room 212B"
          teamMemberName="Team Member 3"
          timeCleaned="12:46 PM"
          cleaningType="Daily"
        ></ReportComponent>
        <ReportComponent
          buildingId="Building A"
          roomId="Room 116A"
          teamMemberName="Team Member 1"
          timeCleaned="3:15 PM"
          cleaningType="Daily"
        ></ReportComponent>
      </Grid>
    </>
  );
};

export default remainingGrid;
