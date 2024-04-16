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
    if (req.method === "GET") {
      const { id } = req.query;
      const rubric = await prisma.rubric.findUnique({
        where: { id: Number(id) },
        include: {
          quantitative_rubric: {
            include: { items: true },
          },
          hollistic_rubric: {
            include: { requirements: true },
          },
        },
      });

      res
        .status(200)
        .json(
          rubric.type === RubricType.QUANTITATIVE
            ? toQuantitativeRubric(rubric)
            : toHollisticRubric(rubric)
        );
    }
  } catch (error) {
    res.status(500).json(error + ": Error retrieving rubric");
  }
}
