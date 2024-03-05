import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

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
      } = req.body;

      if (!first_name || !last_name || !email) {
        res.status(500).send({ error: "Fill out all required fields" });
        return;
      }

      let person;
      await prisma.$transaction(async (prisma) => {
        person = await prisma.person.create({
          data: {
            type: "TEAM_MEMBER",
            first_name,
            last_name,
            country_code,
            state_code,
            phone_number,
            teamMember: {
              create: {
                email,
              },
            },
          },
        });
      });

      res.status(200).send(person);
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message + ": Error creating new member" });
  }
}
