import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  buildingIncludeRooms,
  toBuildingWithRooms,
} from "../../../ts/types/db.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const buildings = await prisma.building.findMany({
        include: buildingIncludeRooms,
      });
      res.status(200).json(buildings.map(toBuildingWithRooms));
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving buidlings");
  }
}
