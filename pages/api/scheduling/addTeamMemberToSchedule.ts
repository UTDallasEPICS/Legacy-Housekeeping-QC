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
                person_id,
                schedule_id
            } = req.body;

            const addedTeamMemberToSchedule = await prisma.schedule.update({
                where:{
                    id : schedule_id
                },
                data: {
                    team_members: {
                        connect: {
                            person_id: person_id
                        }
                    }
                },
            });
            res.status(200).json({response: `Added person with id ${person_id} to schedule with id ${schedule_id}`});
        }
    } catch (error) {
        res.status(500).json(error + " :Error creating room");
    }
}
