import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { points, team_member_id } = req.body;

      const userExists = await prisma.teamMembers.findUnique({
        where: {
          member_id: team_member_id,
        },
      });

      if (!userExists) {
        return res.status(400).json({
          msg: "user not found",
        });
      }

      const addedPoints = await prisma.points.create({
        data: {
          points: points,
          team_member_id: team_member_id,
        },
      });
      res.status(200).json(addedPoints);
    }
  } catch (error) {
    res.status(500).send(error + ": Error retrieving member");
  }
}
