import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { from_date, to_date, member_id } = req.body;
      const scores = await prisma.teamMember.findUnique({
        where: {
          person_id: member_id,
        },
        select: {
          scores: {
            where: {
              inspection: {
                timestamp: {
                  gte: from_date ? new Date(from_date) : undefined,
                  lte: to_date ? new Date(to_date) : undefined,
                },
              },
            },
            orderBy: {
              inspection: {
                timestamp: "desc",
              },
            },
            select: {
              amount: true,
              inspection: {
                select: {
                  timestamp: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json(scores);
    }
  } catch (error) {
    res.status(500).json(error + ": Error retrieving reports");
  }
}
