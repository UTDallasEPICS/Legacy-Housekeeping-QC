import { Card, Grid } from "@mui/material";
import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../../../../ts/types/db.interfaces";
import CompletedCard from "../Card/completedCard";
import UncompletedCard from "../Card/uncompletedCard";
import { toCompletedInspectionCardProps } from "../../../../ts/interfaces/roomReport.interfaces";

const InspectionCardGrid = ({
  inspections,
  status,
}: {
  inspections: Inspection[];
  status: Inspect_Status;
}) => {
  let notInspected = [];
  let inspected = [];

  inspections.forEach((inspection) => {
    switch (inspection.inspect_status) {
      case Inspect_Status.INSPECTED:
        inspected.push(inspection);
        break;
      case Inspect_Status.NOT_INSPECTED:
        notInspected.push(inspection);
        break;
      default:
        break;
    }
  });

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
        <CardCondition
          status={status}
          inspected={inspected}
          notInspected={notInspected}
        />
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
      return (
        <>
          {inspected.map((inspection) => (
            <CompletedCard
              inspectionProps={toCompletedInspectionCardProps(inspection)}
            />
          ))}
        </>
      );
    case Inspect_Status.NOT_INSPECTED:
      return (
        <>
          {notInspected.map((inspection) => (
            <UncompletedCard
              inspectionProps={toCompletedInspectionCardProps(inspection)}
            />
          ))}
        </>
      );
    default:
      return <></>;
  }
};

export default InspectionCardGrid;
