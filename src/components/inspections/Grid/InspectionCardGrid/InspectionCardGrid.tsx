import { Grid, Typography } from "@mui/material";
import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../../../../../ts/types/db.interfaces";
import CompletedCard from "../CompletedCard";
import UncompletedCard from "../UncompletedCard";
import { useSelector } from "react-redux";
import {
  getInspectedReports,
  getNotInspectedReports,
} from "../../../../../slices/inspectionsFetchSlice";
import { InspectionFilterBy, filterInspection } from "./filterInspection";
import { InspectionSortBy, sortInspection } from "./sortInspection";

const InspectionCardGrid = ({
  status,
  filter,
  filterBy,
  sortBy,
}: {
  status: Inspect_Status;
  filter: string;
  filterBy: InspectionFilterBy;
  sortBy: InspectionSortBy;
}) => {
  const inspected = useSelector(getInspectedReports);
  const notInspected = useSelector(getNotInspectedReports);

  const isEmpty =
    (inspected.length === 0 && status === Inspect_Status.INSPECTED) ||
    (notInspected.length === 0 && status === Inspect_Status.NOT_INSPECTED);

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      p={2}
      // maxHeight is needed to allow the scrollbar to scroll to the bottom (basically 100vh - other stuff)
      // Need to make this dynamic in the future
      maxHeight={"75vh"}
      overflow={"auto"}
    >
      {isEmpty && (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            No inspections found
          </Typography>
        </Grid>
      )}
      {CardCondition({
        status,
        inspected,
        notInspected,
        filter,
        filterBy,
        sortBy,
      })}
    </Grid>
  );
};

/*
 * Filter the inspections based on the filter and filterBy
 * Then map the inspections to the appropriate card based on the status
 */
const CardCondition = ({
  status,
  filter,
  filterBy,
  sortBy,
  inspected,
  notInspected,
}: {
  status: Inspect_Status;
  filter: string;
  filterBy: InspectionFilterBy;
  sortBy: InspectionSortBy;
  inspected: Inspection[];
  notInspected: Inspection[];
}) => {
  let inspection = [];
  switch (status) {
    case Inspect_Status.INSPECTED:
      inspection = inspected;
      break;
    case Inspect_Status.NOT_INSPECTED:
      inspection = notInspected;
      break;
    default:
      return <></>;
  }

  inspection = filterInspection(inspection, filter, filterBy);
  inspection = sortInspection(inspection, sortBy);

  return inspection.map((inspection, index) => {
    return (
      <Grid item xs={12} md={6} xl={4} key={inspection.id}>
        {status === Inspect_Status.INSPECTED ? (
          <CompletedCard card_id={index} inspection={inspection} />
        ) : (
          <UncompletedCard card_id={index} inspection={inspection} />
        )}
      </Grid>
    );
  });
};

export default InspectionCardGrid;
