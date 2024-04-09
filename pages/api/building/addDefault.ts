import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import generateBuilding, {
  BuildingData,
  RoomData,
} from "../../../functions/generateBuilding";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const buildingsData: BuildingData[] = await generateBuilding();

      res.status(200).json(buildingsData);
      /*

      // Create transactions for adding buildings
      let buildings;
      await prisma
        .$transaction(
          buildingsData.map((building) =>
            prisma.building.create({
              data: {
                name: building.building_name,
                floor_count: building.max_floor - building.min_floor + 1,
              },
            })
          )
        )
        .then((data) => {
          buildings = data;
        });
      console.log(buildings);

      // Create transactions for adding rooms
      const roomProps = buildingsData.flatMap((buildingData) =>
        buildingData.rooms.map((room: RoomData) => ({
          name: room.room_name,
          floor_number: room.floor_number,
          building_id: Number(
            buildings.find(
              (building) => building.name === buildingData.building_name
            ).id
          ),
          type: room.type_of_room,
        }))
      );
      let rooms;
      await prisma
        .$transaction(
          roomProps.map((room) =>
            prisma.room.create({
              data: room,
            })
          )
        )
        .then((data) => {
          rooms = data;
        });

      // Split room to personal and common area
      const personalRooms = rooms.filter(
        (room) => room.type === "PERSONAL_ROOM"
      );
      const commonRooms = rooms.filter((room) => room.type === "COMMON_AREA");

      // Create transactions for adding personal rooms
      const addedPersonalRooms = (await prisma.personalRoom.createMany({
        data: personalRooms.map((room) => ({
          id: room.id,
          room_id: room.id,
          is_occupied: false,
        })),
      })) as unknown as any[];
      // Create transactions for adding common rooms
      const addedCommonRooms = (await prisma.commonArea.createMany({
        data: commonRooms.map((room) => ({
          id: room.id,
          room_id: room.id,
        })),
      })) as unknown as any[];

      res
        .status(200)
        .json(
          `Add ${rooms.length} rooms and ${buildings.length} buildings successfully`
        );*/
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error + " :Error adding default buildings");
  }
}
