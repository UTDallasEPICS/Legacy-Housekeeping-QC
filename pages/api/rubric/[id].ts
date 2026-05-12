import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RubricType } from "@prisma/client";
import {
  toHollisticRubric,
  toQuantitativeRubric,
} from "../../../ts/types/db.interfaces";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const rubricId = Number(id);

    if (req.method === "GET") {
      const rubric = await prisma.rubric.findUnique({
        where: { id: rubricId },
        include: {
          quantitative_rubric: {
            include: { items: true },
          },
          hollistic_rubric: {
            include: { requirements: true },
          },
        },
      });

      if (!rubric) {
        res.status(404).json({ error: "Rubric not found" });
        return;
      }

      res
        .status(200)
        .json(
          rubric.type === RubricType.QUANTITATIVE
            ? toQuantitativeRubric(rubric)
            : toHollisticRubric(rubric)
        );
      return;
    }

    if (req.method === "DELETE") {
      await prisma.rubric.delete({ where: { id: rubricId } });
      res.status(204).end();
      return;
    }

    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    res.status(500).json(error + ": Error retrieving rubric");
  }
}
