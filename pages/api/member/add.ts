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
        address_line,
        zipcode,
        city,
        state,
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !email ||
        !country_code ||
        !state_code ||
        !phone_number ||
        !address_line ||
        !zipcode ||
        !city ||
        !state 
      ) {
        res.status(500).send({ error: "Fill out all required fields" });
        return;
      }

      const addedMember = await prisma.teamMembers.create({
        data: {
          first_name,
          last_name,
          email,
          country_code,
          state_code,
          phone_number,
          address_line,
          zipcode,
          city,
          state,
        },
      });

      res.status(200).send(addedMember);
    }
  } catch (error) {
    res.status(500).send({ error: "Error creating new member" });
  }
}
