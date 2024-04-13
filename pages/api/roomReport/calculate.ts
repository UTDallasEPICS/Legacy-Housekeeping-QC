import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import ScoringSystem from "../../../functions/scoringSystem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { rubric_id, extra_score } = req.body;

      // Create a new scoring system instance
      const scoringSystem = new ScoringSystem(
        Number(rubric_id),
        Number(extra_score)
      );

      // Initialize scores
      await scoringSystem.initializeScores();

      // Send response
      res.status(201).json({ score: scoringSystem.calculatePercentageScore() });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error saving scores:", error);
    res.status(500).json({ error: "An error occurred while saving scores" });
  }
}
