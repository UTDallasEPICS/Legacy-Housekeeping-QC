import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../../../ts/types/db.interfaces";

export const splitInspectionWithStatus = (inspections: Inspection[]) => {
  let notInspected: Inspection[] = [];
  let inspected: Inspection[] = [];
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
  return { notInspected, inspected };
};
