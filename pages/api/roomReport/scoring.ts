import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { toTeamMember } from "../../../ts/types/db.interfaces";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      if (req.method === "POST") {
        const { roomNumber, date, scores} = req.body;
  
        // Create a new scoring system instance
        const scoringSystem = new scoringSystem(roomNumber, new Date(date));
  
        // Initialize scores
        scoringSystem.initializeScores();
  
        // Update scores based on received data
        for (const { item, score } of scores) {
          scoringSystem.updateScore(item, score);
        }
  
        // Save scores to the database using Prisma Client
        const savedScores = await prisma.score.create({
          data: {
            amount: scoringSystem.calculateTotalScore(),
            team_member: {
              connect: { person_id:  } 
            }
          }
        });
  
        // Send response
        res.status(201).json({ message: 'Scores saved successfully', savedScores });
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
    } catch (error) {
      console.error('Error saving scores:', error);
      res.status(500).json({ error: 'An error occurred while saving scores' });
    }
  }