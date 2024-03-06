import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { toTeamMember } from "../../../ts/types/db.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const {
        id,
        first_name,
        last_name,
        email,
        country_code,
        state_code,
        phone_number,
      } = req.body;

      const updatedPerson = await prisma.person.update({
        where: {
          id,
        },
        data: {
          first_name: first_name || undefined,
          last_name: last_name || undefined,
          country_code: country_code || undefined,
          state_code: state_code || undefined,
          phone_number: phone_number || undefined,
          teamMember: {
            update: {
              email: email || undefined,
            },
          },
        },
      });

      res.status(200).json(updatedPerson);
    }
  } catch (err) {
    res.status(500).send({ error: "Error updating new member,  " + err });
  }
}
