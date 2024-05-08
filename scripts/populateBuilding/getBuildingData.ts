import { RoomType } from "@prisma/client";
import readCSV from "./readCSV";

const buildingCSV = process.env.BUILDING_DEFAULT_FILE;

export interface RoomData {
  room_name: string;
  floor_number: number;
  type_of_room: RoomType;
}

export interface BuildingData {
  building_name: string;
  rooms: RoomData[];
  min_floor?: number;
  max_floor?: number;
}

export const getBuildingData = async () => {
  const parsedData = ((await readCSV(buildingCSV)) as any[]).filter(
    (data) => data["Room ID"]
  );

  // Convert to RoomData
  const roomData = parsedData.map((data) => {
    // Convert the floor to a number
    const floor = data["FLOOR"];
    // The negative floor number is convert as positive for now
    const floorNumber = floor[0] === "G" ? Number(floor[1]) : Number(floor);
    if (!floorNumber) console.log(data);
    // Get room name
    const roomName = data["Room ID"];
    if (!roomName) console.log(data);
    // Get building name
    const buildingName = data["BUILDING"];
    // Get room type
    const roomType =
      data["AREATYPE"] === "Patient Room" ||
      data["AREATYPE"] === "Restroom by Fixture"
        ? RoomType.PERSONAL_ROOM
        : RoomType.COMMON_AREA;
    if (!buildingName) console.log(data);
    const room = {
      building_name: buildingName,
      room_name: roomName,
      floor_number: floorNumber,
      type_of_room: roomType,
    };
    return room;
  });
  // Split the data into a group of room in a building
  const buildingData = roomData.reduce((acc, room) => {
    const { building_name, floor_number, ...roomProps } = room;
    const buildingIndex = acc.findIndex(
      (building) => building.building_name === building_name
    );
    if (buildingIndex === -1) {
      acc.push({
        building_name,
        min_floor: floor_number,
        max_floor: floor_number,
        rooms: [{ floor_number, ...roomProps }],
      });
    } else {
      acc[buildingIndex].rooms.push({ floor_number, ...roomProps });
      if (floor_number < acc[buildingIndex].min_floor)
        acc[buildingIndex].min_floor = floor_number;
      if (floor_number > acc[buildingIndex].max_floor)
        acc[buildingIndex].max_floor = floor_number;
    }
    return acc;
  }, [] as BuildingData[]);
  return buildingData;
};

export default getBuildingData;
