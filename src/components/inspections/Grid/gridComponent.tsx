import { Card, Grid, Typography } from "@mui/material";
import { CompleteGrid, LockedGrid, RemainingGrid } from "../..";
import ReportForm from "./ReportForm"; // import the ReportForm component

import {
  Box,
  Divider,
  List,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import DashboardCardButton from "../../dashboardComponents/dashboardCardButton";
import DashboardCardHeading from "../../dashboardComponents/dashboardCardHeading";
import CompletedInspectionListItemCard from "../../globalComponents/completedInspectionListItemCard";
import RemainingInspectionListItemCard from "../../globalComponents/remainingInspectionListItemCard";

import { useState } from "react";
import InspectionGrid from "./InspectionGrid";
import { Inspection } from "../../../../ts/types/db.interfaces";

const GridComponent = ({ inspections }: { inspections: Inspection[] }) => {
  return (
    <>
      <Box>
        <InspectionGrid inspections={inspections} />

        <Card
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            flexBasis: 0,
            flexGrow: 1,
            //width: "max-content",
          }}
        >
          <DashboardCardHeading text="Add Inspection" />
          <ReportForm /> {/*Form to manually add new report to the database*/}
        </Card>
      </Box>
    </>
  );
};

export default GridComponent;
