import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RoomType } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const {
                start_time,
                end_time,
                clean_type,
                room_id
            } = req.body;

            const addedSchedule = await prisma.schedule.create({
                data: {
                    start_time: start_time,
                    end_time: end_time,
                    clean_type: clean_type,
                    room_id: room_id
                },
            });
        }
    } catch (error) {
        res.status(500).json(error + " :Error creating room");
    }
}
