import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { first_name, last_name, email, phone_number, address } = req.body;
      const addedUser = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: address,
        },
      });
      res.status(200).json(addedUser);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating user");
  }
}
