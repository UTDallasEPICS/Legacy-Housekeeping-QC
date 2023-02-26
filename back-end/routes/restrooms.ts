const router = require("express").Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a Restroom
router.post("/addRestroom", async (req: Request, res: Response) => {
  const { room_id } = req.body;
  const restroom = await prisma.restrooms.create({
    data: {
      room_id: room_id,
    },
  });
  res.json(restroom);
});

// Get all Restrooms
router.get("/restrooms", async (req: Request, res: Response) => {
  const restrooms = await prisma.restrooms.findMany({
    include: {
      room: true,
      items: true,
    },
  });
  res.json(restrooms);
});

module.exports = router;
