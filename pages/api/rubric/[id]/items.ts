import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const rubricId = Number(id);

    if (req.method === "GET") {
      const items = await prisma.item.findMany({
        where: { quantitative_id: rubricId },
      });
      res.status(200).json(items);
      return;
    }

    if (req.method === "PUT") {
      const { items, room_id } = req.body;
      if (!Array.isArray(items)) {
        res.status(400).json({ error: "items must be an array" });
        return;
      }

      const updatedItems = await prisma.$transaction(
        items.map((item) => {
          if (item.is_deleted) return prisma.item.delete({ where: { id: item.id } });
          return prisma.item.upsert({
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
              quantitative_rubric: { connect: { id: rubricId } },
              room: { connect: { id: Number(room_id) } },
            },
          });
        })
      );

      res.status(200).json(updatedItems);
      return;
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    res.status(500).json(error + ": Error handling rubric items");
  }
}
