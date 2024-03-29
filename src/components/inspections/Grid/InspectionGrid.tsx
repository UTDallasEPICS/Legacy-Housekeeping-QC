import {
  Box,
  Card,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DashboardCardHeading from "../../dashboardComponents/dashboardCardHeading";
import { useState } from "react";
import { Inspect_Status } from "@prisma/client";
import InspectionCardGrid from "./inspectionCardGrid";
const InspectionGrid = () => {
  const [inspectionStatusFilter, setInspectionStatusFilter] =
    useState<Inspect_Status>(Inspect_Status.INSPECTED);

  const handleInspectionStatusFilter = (
    event: React.MouseEvent<HTMLElement>,
    inspectionStatusFilter: Inspect_Status | null
  ) => {
    if (inspectionStatusFilter !== null) {
      setInspectionStatusFilter(inspectionStatusFilter);
    }
  };

  return (
    <Card
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
        flexBasis: 0,
        flexGrow: 1,
        height: "auto",
        minHeight: "100vh",
      }}
    >
      <DashboardCardHeading text="Inspections" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", p: 2 }}>
          <ToggleButtonGroup
            value={inspectionStatusFilter}
            exclusive
            onChange={handleInspectionStatusFilter}
          >
            <ToggleButton value={Inspect_Status.INSPECTED}>
              Completed
            </ToggleButton>
            <ToggleButton value={Inspect_Status.NOT_INSPECTED}>
              Remaining
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider flexItem />

        <InspectionCardGrid status={inspectionStatusFilter} />
      </Box>
    </Card>
  );
};

export default InspectionGrid;
