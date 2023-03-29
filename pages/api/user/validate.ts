import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;
      // Figure out how to check if password matches or else return error
      const userExist = prisma.user.findUnique({
        where: { email },
        select: {
          password: true,
        },
      });

      res.status(200).json(userExist);
    }
  } catch (error) {
    res.status(500).json(error + " :Error updating user");
  }
}
