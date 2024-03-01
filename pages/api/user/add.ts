import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { toUser } from "../../../ts/types/db.interfaces";

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
        role,
      } = req.body;

      const hash = await bcrypt.hash(password, 12);

      let person;
      await prisma.$transaction(async (prisma) => {
        person = await prisma.person.create({
          data: {
            type: "USER",
            first_name,
            last_name,
            email,
            country_code,
            state_code,
            phone_number,
          },
        });
        const user = await prisma.user.create({
          data: {
            person: { connect: { id: person.id } },
            username: email,
            password: hash,
          },
        });
      });

      res.status(200).json(person);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error + " :Error creating user" });
  }
}
