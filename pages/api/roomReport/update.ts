import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const {
        id,
        members_ids,
        room_pics,
        clean_status,
        comment,
        extra_score,
        score,
      } = req.body;

      const updatedReport = await prisma.inspection.update({
        where: { id },
        data: {
          timestamp: new Date(),
          comment,
          room_pics,
          clean_status,
          inspect_status: "INSPECTED",
          extra_score: Number(extra_score),
          score: {
            create: {
              amount: score,
              team_member: {
                connect: members_ids.map((id) => ({ person_id: id })),
              },
            },
          },
        },
      });
      res.status(200).json(updatedReport);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
