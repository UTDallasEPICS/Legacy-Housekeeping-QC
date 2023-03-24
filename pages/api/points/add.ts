import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { increment } from "../../../slices/counterSlice";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { points, team_member_id } = req.body;

      // Checks if team member exist
      const memberExists = await prisma.teamMembers.findUnique({
        where: {
          member_id: team_member_id,
        },
      });

      if (!memberExists) {
        return res.status(400).json({
          msg: "user not found",
        });
      }

      // Adds points to team member
      const addedPoints = await prisma.points.create({
        data: {
          points: points,
          team_member_id: team_member_id,
        },
      });

      // Adds to the total points
      const member = await prisma.teamMembers.update({
        where: {
          member_id: team_member_id,
        },
        data: {
          total_points: {
            increment: points,
          },
        },
      });
      res.status(200).json(addedPoints);
    }
  } catch (error) {
    res.status(500).send({ error: "Error adding points" + error });
  }
}
