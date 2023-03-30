import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        first_name,
        last_name,
        email,
        country_code,
        state_code,
        phone_number,
        password,
        role
      } = req.body;

      const hash = await bcrypt.hash(password, 12);

      const addedUser = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          country_code,
          state_code,
          phone_number,
          password: hash,
          role
        },
      });
      res.status(200).json(addedUser);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating user");
  }
}
