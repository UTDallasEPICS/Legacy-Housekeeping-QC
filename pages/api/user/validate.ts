import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      const userExist = await prisma.user.findUnique({
        where: { email: email },
        select: {
          password: true,
        },
      });

      // Check if user exists if not return
      if (!userExist) res.status(500).send({ error: "User not found" });

      // Check if password matches if not return
      if (!(await bcrypt.compare(password, userExist.password)))
        res.status(500).send({ error: "Invalid password" });

      const user = await prisma.user.findUnique({
        where: { email: email },
        select: {
          first_name: true,
          role: true,
          email: true,
        },
      });

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send(error + " :Error updating user");
  }
}
