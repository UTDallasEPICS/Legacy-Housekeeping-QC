import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { defaultItems } from "../../../ts/const/rubric.constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      // Filter out item that is already exist
      let promisedItems = defaultItems
        .map((category) => {
          return category.items.map((item) => {
            const itemExists = checkItemExists(item, category.category);
            return itemExists.then((itemExists) => {
              if (!itemExists) {
                return {
                  is_default: true,
                  category: category.category,
                  item_name: item,
                };
              } else {
                return null;
              }
            });
          });
        })
        .flat();
      let addedItems = (await Promise.all(promisedItems)).filter(
        (item) => item !== null
      );
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

const checkItemExists = async (item: string, category: string) => {
  return await prisma.item.findFirst({
    where: { item_name: item, category: category },
  });
};
