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
                start_time,
                end_time,
                clean_type,
                room_id
            } = req.body;

            const addedSchedule = await prisma.schedule.create({
                data: {
                    start_time: new Date(start_time),
                    end_time: new Date(end_time),
                    clean_type: clean_type.toUpperCase() as CleanType,
                    room_id: room_id
                },
            });
            res.status(200).json(addedSchedule);
        }
    } catch (error) {
        res.status(500).json(error + " :Error adding room to schedule");
    }
}
