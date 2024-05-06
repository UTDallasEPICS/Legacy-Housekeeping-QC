import {
  Box,
  Card,
  Divider,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DashboardCardHeading from "../../../dashboardComponents/dashboardCardHeading";
import { useState } from "react";
import { Inspect_Status } from "@prisma/client";
import InspectionCardGrid from "../InspectionCardGrid";
import { InspectionFilterBy } from "../InspectionCardGrid/filterInspection";

const InspectionGrid = () => {
  const [inspectionStatusFilter, setInspectionStatusFilter] =
    useState<Inspect_Status>(Inspect_Status.INSPECTED);
  const [filter, setFilter] = useState("");
  const [filterBy, setFilterBy] = useState(InspectionFilterBy.ROOM_NAME);

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
        <Box sx={{ display: "flex", p: 2, gap: 2 }}>
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

          <TextField
            label="Search"
            variant="standard"
            onChange={(event) => setFilter(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            select
            label="Filter By"
            value={filterBy}
            onChange={(event) =>
              setFilterBy(event.target.value as InspectionFilterBy)
            }
          >
            {Object.values(InspectionFilterBy).map((filterBy) => (
              <MenuItem key={filterBy} value={filterBy}>
                {filterBy}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Divider flexItem />

        <InspectionCardGrid
          status={inspectionStatusFilter}
          filter={filter}
          filterBy={filterBy}
        />
      </Box>
    </Card>
  );
};

export default InspectionGrid;
