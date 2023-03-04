import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { user_id, first_name, last_name, email, phone_number, address } =
        req.body;
      const updatedUser = await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: address,
        },
      });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json(error + " :Error updating user");
  }
}
