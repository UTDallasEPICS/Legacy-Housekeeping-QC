import { Grid } from "@mui/material";
import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../../../../ts/types/db.interfaces";
import CompletedCard from "../Card/completedCard";
import UncompletedCard from "../Card/uncompletedCard";
import { toUncompletedInspectionCardProps } from "../../../../ts/interfaces/roomReport.interfaces";
import { useSelector } from "react-redux";
import {
  getInspectedReports,
  getNotInspectedReports,
} from "../../../../slices/inspectionsFetchSlice";

const InspectionCardGrid = ({ status }: { status: Inspect_Status }) => {
  const inspected = useSelector(getInspectedReports);
  const notInspected = useSelector(getNotInspectedReports);

  return (
    <>
      <Grid
        container
        item
        direction="row"
        xs={4}
        rowSpacing={2}
        sx={{ width: "max-content", overflow: "visible", p: 2 }}
      >
        {CardCondition({ status, inspected, notInspected })}
      </Grid>
    </>
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
        <UncompletedCard
          card_id={index}
          inspectionProps={toUncompletedInspectionCardProps(inspection)}
        />
      ));
    case Inspect_Status.NOT_INSPECTED:
      return notInspected.map((inspection, index) => (
        <UncompletedCard
          card_id={index}
          inspectionProps={toUncompletedInspectionCardProps(inspection)}
        />
      ));
    default:
      return <></>;
  }
};

export default InspectionCardGrid;
