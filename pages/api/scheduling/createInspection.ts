import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { schedule_id, room_id, inspector_id } = req.body;

      let inspection, room;
      await prisma.$transaction(async (prisma) => {
        room = await prisma.room.findUnique({
          where: { id: room_id },
          select: { rubric_id: true },
        });
        inspection = await prisma.inspection.create({
          data: {
            inspector: { connect: { person_id: Number(inspector_id) } },
            schedule: { connect: { id: Number(schedule_id) } },
            rubric: { connect: { id: room.rubric_id } },
            inspect_status: "NOT_INSPECTED",
          },
        });
      });

      res.status(200).json(inspection);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error + " :Error creating room report");
  }
}
