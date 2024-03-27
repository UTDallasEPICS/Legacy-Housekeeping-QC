import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { items, rubric_id, room_id } = req.body;

      console.log(items);

      const updatedItems = await prisma.$transaction(
        items.map((item) =>
          prisma.item.upsert({
            where: { id: item.id },
            update: {
              name: item.name,
              category: item.category,
              weight: item.weight,
              is_checked: item.is_checked,
            },
            create: {
              name: item.name,
              category: item.category,
              weight: item.weight,
              is_checked: item.is_checked,
              quantitative_rubric: { connect: { id: Number(rubric_id) } },
              room: { connect: { id: Number(room_id) } },
            },
          })
        )
      );

      res.status(200).json(updatedItems);
    }
  } catch (error) {
    res.status(500).json(error + ": Error retrieving items");
  }
}
