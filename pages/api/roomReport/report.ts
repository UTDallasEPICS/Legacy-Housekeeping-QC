import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  inspectionIncludeAll,
  toInspection,
} from "../../../ts/types/db.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const inspections = await prisma.inspection.findMany({
        include: inspectionIncludeAll,
      });
      res.status(200).json(inspections.map(toInspection));
    }
  } catch (error) {
    res.status(500).json(error + ": Error retrieving reports");
  }
}
