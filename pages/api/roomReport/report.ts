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
    if (req.method === "POST") {
      const { date } = req.body;
      const dateOnly = date.split("T")[0];
      const inspections = await prisma.inspection.findMany({
        include: inspectionIncludeAll,
        where: {
          schedule: {
            start_time: {
              gte: new Date(dateOnly),
              lt: new Date(dateOnly + "T23:59:59"),
            },
          },
        },
      });
      res.status(200).json(inspections.map(toInspection));
    }
  } catch (error) {
    res.status(500).json(error + ": Error retrieving reports");
  }
}
