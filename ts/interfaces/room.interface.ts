import { Room } from "../types/db.interfaces";

export interface RoomWithBuilding {
  id: number;
  name: string;
  building: {
    name: string;
  };
}

export interface BuildingWithRooms {
  id: number;
  name: string;
  rooms: Room[];
}