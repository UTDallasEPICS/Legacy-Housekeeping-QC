import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { defaultItems } from "../../../ts/const/rubric.constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { room_id, rubric_id } = req.body;

      // Filter out item that is already exist
      let promisedItems = defaultItems
        .map((category) => {
          return category.items.map((item) => {
            return {
              category: category.category,
              name: item,
              is_checked: false,
              room_id: Number(room_id),
              quantitative_id: Number(rubric_id),
            };
          });
        })
        .flat();
      let addedItems = await Promise.all(promisedItems);
      await prisma.$transaction(async (prisma) => {
        await prisma.item.createMany({
          data: addedItems,
        });
      });
      res.status(200).json(addedItems);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error + " :Error adding default items");
  }
}
