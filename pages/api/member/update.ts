import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const {
        member_id,
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

      const addedMember = await prisma.teamMembers.update({
        where: {
          member_id,
        },
        data: {
          first_name: first_name || undefined,
          last_name: last_name || undefined,
          email: email || undefined,
          country_code: country_code || undefined,
          state_code: state_code || undefined,
          phone_number: phone_number || undefined,
          address_line: address_line || undefined,
          zipcode: zipcode || undefined,
          city: city || undefined,
          state: state || undefined,
        },
      });
      res.status(200).json(addedMember);
    }
  } catch (err) {
    res.status(500).send({ error: "Error craeting new member,  " + err });
  }
}
