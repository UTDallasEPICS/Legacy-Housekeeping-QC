import { Card, Grid, Typography } from "@mui/material";
import { CompleteGrid, LockedGrid, RemainingGrid } from "../../src/components";
import ReportForm from "./ReportForm"; // import the ReportForm component

import {
  Box,
  Divider,
  List,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import DashboardCardButton from "../../src/components/dashboardComponents/dashboardCardButton";
import DashboardCardHeading from "../../src/components/dashboardComponents/dashboardCardHeading";
import CompletedInspectionListItemCard from "../../src/components/globalComponents/completedInspectionListItemCard";
import RemainingInspectionListItemCard from "../../src/components/globalComponents/remainingInspectionListItemCard";

import { useState } from "react";
import InspectionGrid from "../../src/components/inspections/Grid/InspectionGrid";
import { Inspection } from "../../ts/types/db.interfaces";

const GridComponent = ({ inspections }: { inspections: Inspection[] }) => {
  return (
    <>
      <Box>
        <InspectionGrid inspections={inspections} />
      </Box>
    </>
  );
};

export default GridComponent;
