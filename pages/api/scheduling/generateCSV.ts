import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {CleanType} from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const {
                building_name,
                floor,
                schedule_data
            } : {building_name: string, floor: number, schedule_data : [{id: number, start_time: Date, end_time: Date, clean_type: CleanType, room_id: number}]}
                = req.body;

            const scheduleCSVData = await generateCSV(building_name, floor, schedule_data);
            res.status(200).json({csvData: scheduleCSVData});

        }
    } catch (error) {
        res.status(500).json(error + " :Error generating pdf");
    }
}

const getRoomName = async (room_id: number) => {
    const room = await prisma.room.findUnique({
        where: {
            id: room_id
        }
    });
    return room.name;
}

//TODO: Complete document formatting and testing
const generateCSV = async (building_name, floor, schedule_data: [{id: number, start_time: Date, end_time: Date, clean_type: CleanType, room_id: number}]) => {
    let csvData = "Room Name, Start Time, End Time, Clean Type\n";
    csvData += `Name: , 6:00AM - 2:30PM, More Info On Back\n`;
    csvData += `Date: , Housekeeper, Mas Informacion Atras\n`;
    csvData += `Area: ${building_name} Floor ${floor}, See Area, 1.5 Hour Per Room\n\n`;
    for (const schedule of schedule_data) {
        const roomName = await getRoomName(schedule.room_id);
        csvData += `${roomName}, ${schedule.start_time}, ${schedule.end_time}, ${schedule.clean_type}\n`;
    }
    return Buffer.from(csvData).toString('base64');
}
