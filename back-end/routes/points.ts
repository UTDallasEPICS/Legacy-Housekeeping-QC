const router = require("express").Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add Points to a team member
router.post("/addPoints", async (req: Request, res: Response) => {
  const { points, team_member_id } = req.body;

  const userExists = await prisma.team_Members.findUnique({
    where: {
      member_id: team_member_id,
    },
  });

  if (!userExists) {
    return res.status(400).json({
      msg: "user not found",
    });
  }

  const addedPoints = await prisma.points.create({
    data: {
      points: points,
      team_member_id: team_member_id,
    },
  });
  // For testing purposes
  console.log(addedPoints);
  res.json(addedPoints);
});

module.exports = router;
