const router = require("express").Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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

router.get("/getRooms", async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany({});
  res.json(rooms);
});

module.exports = router;
