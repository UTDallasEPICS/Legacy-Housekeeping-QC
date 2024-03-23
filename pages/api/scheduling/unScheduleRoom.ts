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
                schedule_id
            } = req.body;

            const deletedSchedule = await prisma.schedule.delete({
                where: {
                    id: schedule_id,
                },
            });

            res.status(200).json(deletedSchedule);
        }
    } catch (error) {
        res.status(500).json(error + " :Error unscheduling room");
    }
}
