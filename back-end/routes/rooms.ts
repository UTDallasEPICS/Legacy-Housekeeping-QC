const router = require("express").Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a Room
router.post("/addRoom", async (req: Request, res: Response) => {
  const {
    time_stamp,
    room_number,
    building_number,
    is_clean,
    is_active,
    type_of_room,
  } = req.body;

  const room = await prisma.room.create({
    data: {
      time_stamp,
      room_number,
      building_number,
      is_clean,
      is_active,
      type_of_room,
    },
  });

  res.json(room);
});

// Get all rooms
router.get("/rooms", async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany({});
  res.json(rooms);
});

// Get all rooms that are Restrooms
router.get("/rooms/Restrooms", async (req: Request, res: Response) => {
  const restrooms = await prisma.room.findMany({
    where: {
      type_of_room: {
        equals: "Restroom",
      },
    },
  });
  res.json(restrooms);
});

module.exports = router;
