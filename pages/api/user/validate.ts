import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { fromUser, toUser } from "../../../ts/types/db.interfaces";
import { LensTwoTone } from "@mui/icons-material";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { email: email },
    });

    // Check if user exists if not return
    if (!userExist) return res.status(404).send({ error: "User not found" });

    // Check if password matches if not return
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch)
      return res.status(401).send({ error: "Invalid password" });

    const userPerson = await prisma.user.findUnique({
      where: { email: email },
      include: { person: true },
    });
    const user = fromUser(userPerson);
    const validatedUser = {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
    };

    return res.status(200).json(validatedUser);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `Error validating user: ${error.message}` });
  }
}
