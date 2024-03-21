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
                date
            } = req.body;

            const dateOnly = date.split('T')[0];

            const schedule = await prisma.schedule.findMany({
                where: {
                    start_time: {
                        gte: new Date(dateOnly),
                        lt: new Date(dateOnly + "T23:59:59")
                    }
                },
            });
            res.status(200).json(schedule);
        }
    } catch (error) {
        res.status(500).json(error + " :Error creating room");
    }
}
