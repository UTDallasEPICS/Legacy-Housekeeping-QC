import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { data: session } = useSession();

      const { team_member_ids, room_id } = req.body;

      let inspection;
      await prisma.$transaction(async (prisma) => {
        const schedule = await prisma.schedule.create({
          data: {
            team_members: { connect: team_member_ids.map((id) => ({ id })) },
            room: { connect: { id: room_id } },
          },
        });
        inspection = await prisma.inspection.create({
          data: {
            inspector: { connect: { person_id: session?.user?.id } },
            schedule: { connect: { id: schedule.id } },
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
