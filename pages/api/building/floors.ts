import { PrismaClient } from "@prisma/client";
import { BuildingWithFloors, toBuildingWithFloors } from "../../../ts/types/db.interfaces";

const prisma = new PrismaClient();

export async function getAllBuildingsWithFloors(): Promise<BuildingWithFloors[]> {
  const buildings = await prisma.building.findMany();
  return buildings.map(toBuildingWithFloors);
}