import { Grid, Typography } from "@mui/material";
import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../../../../ts/types/db.interfaces";
import CompletedCard from "../Card/completedCard";
import UncompletedCard from "../Card/uncompletedCard";
import { useSelector } from "react-redux";
import {
  getInspectedReports,
  getNotInspectedReports,
} from "../../../../slices/inspectionsFetchSlice";
import { InspectionFilterBy } from "../../../../ts/const/inspection.constant";
import { filterInspection } from "../../../../functions/filterInspection";

const InspectionCardGrid = ({
  status,
  filter,
  filterBy,
}: {
  status: Inspect_Status;
  filter: string;
  filterBy: InspectionFilterBy;
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
      maxHeight={"75vh"} // This is needed to allow the scrollbar to scroll to the bottom (basically 100vh - other stuff)
      overflow={"auto"}
    >
      {isEmpty && (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            No inspections found
          </Typography>
        </Grid>
      )}
      {CardCondition({ status, inspected, notInspected, filter, filterBy })}
    </Grid>
  );
};

const CardCondition = ({
  status,
  filter,
  filterBy,
  inspected,
  notInspected,
}: {
  status: Inspect_Status;
  filter: string;
  filterBy: InspectionFilterBy;
  inspected: Inspection[];
  notInspected: Inspection[];
}) => {
  switch (status) {
    case Inspect_Status.INSPECTED:
      return filterInspection(inspected, filter, filterBy).map(
        (inspection, index) => (
          <Grid item xs={12} md={6} xl={4} key={inspection.id}>
            <CompletedCard card_id={index} inspection={inspection} />
          </Grid>
        )
      );
    case Inspect_Status.NOT_INSPECTED:
      return filterInspection(notInspected, filter, filterBy).map(
        (inspection, index) => (
          <Grid item xs={12} md={6} xl={4} key={inspection.id}>
            <UncompletedCard card_id={index} inspection={inspection} />
          </Grid>
        )
      );
    default:
      return <></>;
  }
};

export default InspectionCardGrid;
