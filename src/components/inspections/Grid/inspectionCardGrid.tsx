import { Grid } from "@mui/material";
import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../../../../ts/types/db.interfaces";
import CompletedCard from "../Card/completedCard";
import UncompletedCard from "../Card/uncompletedCard";
import {
  toCompletedInspectionCardProps,
  toUncompletedInspectionCardProps,
} from "../../../../ts/interfaces/roomReport.interfaces";
import { useSelector } from "react-redux";
import {
  getInspectedReports,
  getNotInspectedReports,
} from "../../../../slices/inspectionsFetchSlice";

const InspectionCardGrid = ({ status }: { status: Inspect_Status }) => {
  const inspected = useSelector(getInspectedReports);
  const notInspected = useSelector(getNotInspectedReports);
  console.log(inspected);

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      p={2}
      maxHeight={"75vh"} // This is needed to allow the scrollbar to scroll to the bottom (basically 100vh - other stuff)
      overflow={"auto"}
    >
      {CardCondition({ status, inspected, notInspected })}
    </Grid>
  );
};

const CardCondition = ({
  status,
  inspected,
  notInspected,
}: {
  status: Inspect_Status;
  inspected: Inspection[];
  notInspected: Inspection[];
}) => {
  switch (status) {
    case Inspect_Status.INSPECTED:
      return inspected.map((inspection, index) => (
        <Grid item xs={12} md={6} xl={4}>
          <CompletedCard
            card_id={index}
            inspectionProps={toCompletedInspectionCardProps(inspection)}
          />
        </Grid>
      ));
    case Inspect_Status.NOT_INSPECTED:
      return notInspected.map((inspection, index) => (
        <Grid item xs={12} md={6} xl={4}>
          <UncompletedCard
            card_id={index}
            inspectionProps={toUncompletedInspectionCardProps(inspection)}
          />
        </Grid>
      ));
    default:
      return <></>;
  }
};

export default InspectionCardGrid;
