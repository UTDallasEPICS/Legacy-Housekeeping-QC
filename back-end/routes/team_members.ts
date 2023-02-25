const router = require("express").Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add a Team Member, points is optional default 0
router.post("/addMember", async (req: Request, res: Response) => {
  const { first_name, last_name, email } = req.body;
  const member = await prisma.team_Members.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  });
  // For testing purposes
  console.log(member);
  res.json(member);
});

// Get all the Team Members with points and time stamp
router.get("/members", async (req: Request, res: Response) => {
  const members = await prisma.team_Members.findMany({
    include: {
      points: {
        select: {
          points: true,
          time_stamp: true,
          points_id: true,
        },
      },
    },
  });
  res.json(members);
});

// Get a Team Member by id
router.get("/member/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const member = await prisma.team_Members.findUnique({
    where: {
      member_id: id,
    },
    include: {
      points: {
        select: {
          points: true,
          //time_stamp: true,
        },
      },
    },
  });
  res.json(member);
  console.log(member);
});

// Update a Team Member
router.put("/updateMember", async (req: Request, res: Response) => {
  const { id, first_name, last_name, email } = req.body;
  const updatedMember = await prisma.team_Members.update({
    where: {
      member_id: id,
    },
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  });
  // Testing purposes
  res.json(updatedMember);
  console.log(updatedMember);
});

// Delete a Team Member
router.delete("/deleteMember/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedMember = prisma.team_Members.delete({
    where: {
      member_id: id,
    },
  });
  console.log(deletedMember);
  res.json(deletedMember);
});

module.exports = router;
