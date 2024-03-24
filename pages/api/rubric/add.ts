import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RubricType } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { rubric_type } = req.body;

      const rubricType = rubric_type.toUpperCase() as RubricType;
      const rubric = await prisma.rubric.create({
        data: { type: rubricType },
      });

      const items = await prisma.item.findMany({
        where: { is_default: true },
      });

      if (rubricType == RubricType.QUANTITATIVE) {
        const addedQuantitativeRubric = await prisma.quantitativeRubric.create({
          data: {
            id: rubric.id,
            rubric_id: rubric.id,
            items: {
              connect: items.map((item) => ({ id: item.id })),
            },
          },
        });
      } else if (rubricType == RubricType.HOLLISTIC) {
        const addedHollisticRubric = await prisma.hollisticRubric.create({
          data: {
            id: rubric.id,
            rubric_id: rubric.id,
          },
        });
      }

      res.status(200).json(rubric);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error + " :Error creating room report");
  }
}
