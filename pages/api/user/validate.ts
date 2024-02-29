import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    const personExist = await prisma.person.findUnique({
      where: { email: email },
      include: { user: true },
    });

    const userExist = personExist?.user;

    // Check if user exists if not return
    if (!userExist) return res.status(404).send({ error: "User not found" });

    // Check if password matches if not return
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch)
      return res.status(401).send({ error: "Invalid password" });

    const person = await prisma.person.findUnique({
      where: { email: email },
      select: {
        first_name: true,
        email: true,
      },
    });

    return res.status(200).json(person);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `Error updating user: ${error.message}` });
  }
}
