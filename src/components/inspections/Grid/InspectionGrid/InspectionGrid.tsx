import {
  Box,
  Card,
  Divider,
  IconButton,
  Menu,
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
import SortIcon from "@mui/icons-material/Sort";
import { InspectionSortBy } from "../InspectionCardGrid/sortInspection";

const inspectionGrid = () => {
  const [inspectionStatusFilter, setInspectionStatusFilter] =
    useState<Inspect_Status>(Inspect_Status.NOT_INSPECTED);
  const [filter, setFilter] = useState("");
  const [filterBy, setFilterBy] = useState(InspectionFilterBy.ROOM_NAME);
  const [sortBy, setSortBy] = useState(InspectionSortBy.ROOM_NAME);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

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
        <Box
          sx={{
            display: "flex",
            p: 2,
            gap: 2,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            value={inspectionStatusFilter}
            exclusive
            onChange={handleInspectionStatusFilter}
          >
            <ToggleButton value={Inspect_Status.NOT_INSPECTED}>
              Remaining
            </ToggleButton>
            <ToggleButton value={Inspect_Status.INSPECTED}>
              Completed
            </ToggleButton>
          </ToggleButtonGroup>

          <Box
            sx={{ display: "flex", flexGrow: 1, gap: 2, alignSelf: "stretch" }}
          >
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

            <IconButton
              onClick={(e) => setAnchor(e.currentTarget)}
              style={{ borderRadius: 0 }}
            >
              <SortIcon />
            </IconButton>
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {Object.values(InspectionSortBy).map((sortBy) => (
                <MenuItem
                  key={sortBy}
                  value={sortBy}
                  onClick={() => {
                    setSortBy(sortBy);
                    setAnchor(null);
                  }}
                >
                  {sortBy}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <Divider flexItem />

        <InspectionCardGrid
          status={inspectionStatusFilter}
          filter={filter}
          filterBy={filterBy}
          sortBy={sortBy}
        />
      </Box>
    </Card>
  );
};

export default inspectionGrid;
