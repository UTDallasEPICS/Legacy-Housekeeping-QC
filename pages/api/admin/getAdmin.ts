import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession(req, res, authOptions);
  try {
    if (req.method === "GET") {
      const { admin_id } = req.body;

      const user = await prisma.admin.findUnique({
        where: {
          admin_id,
        },
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
              country_code: true,
              state_code: true,
              phone_number: true,
            },
          },
        },
      });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send({ error: "Error: " + error });
  }
}
