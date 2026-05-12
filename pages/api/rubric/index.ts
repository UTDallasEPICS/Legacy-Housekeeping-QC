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

      const rubricType = (rubric_type || "").toUpperCase() as RubricType;
      const rubric = await prisma.rubric.create({
        data: { type: rubricType },
      });

      if (rubricType == RubricType.QUANTITATIVE) {
        await prisma.quantitativeRubric.create({
          data: {
            id: rubric.id,
            rubric_id: rubric.id,
          },
        });
      } else if (rubricType == RubricType.HOLLISTIC) {
        await prisma.hollisticRubric.create({
          data: {
            id: rubric.id,
            rubric_id: rubric.id,
          },
        });
      }

      res.status(201).json(rubric);
      return;
    }

    if (req.method === "GET") {
      const rubrics = await prisma.rubric.findMany();
      res.status(200).json(rubrics);
      return;
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    res.status(500).json(error + " :Error processing rubric request");
  }
}
