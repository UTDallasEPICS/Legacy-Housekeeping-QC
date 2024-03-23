import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

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

            await prisma.schedule.update({
                where:{
                    id : schedule_id
                },
                data: {
                    team_members: {
                        disconnect: {
                            person_id: person_id
                        }
                    }
                },
            });

            res.status(200).json({response: `Removed person with id ${person_id} from schedule with id ${schedule_id}`});
        }
    } catch (error) {
        res.status(500).json(error + " :Error removing person from schedule");
    }
}
