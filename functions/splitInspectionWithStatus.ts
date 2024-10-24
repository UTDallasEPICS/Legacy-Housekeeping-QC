import { Inspect_Status } from "@prisma/client";
import { Inspection } from "../ts/types/db.interfaces";

export const splitInspectionWithStatus = (inspections: Inspection[] = []) => {
  // Log the inspections value and its type
  console.log('inspections:', JSON.stringify(inspections, null, 2));
  console.log('Type of inspections:', typeof inspections);
  console.log('Is inspections an array:', Array.isArray(inspections));

  let notInspected: Inspection[] = [];
  let inspected: Inspection[] = [];

  // Check if inspections is an array
  if (Array.isArray(inspections)) {
    inspections.forEach((inspection) => {
      switch (inspection.inspect_status) {
        case Inspect_Status.INSPECTED:
          inspected.push(inspection);
          break;
        case Inspect_Status.NOT_INSPECTED:
          notInspected.push(inspection);
          break;
        default:
          console.warn('Unknown inspection status:', inspection.inspect_status);
          break;
      }
    });
  } else {
    console.error('Error: inspections is not an array. Received:', inspections);
  }

  return { notInspected, inspected };
};
