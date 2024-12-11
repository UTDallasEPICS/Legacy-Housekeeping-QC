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

            // console.log("Request body:", req.body);
            // console.log("Person ID:", person_id);
            // console.log("Schedule ID:", schedule_id);

            await prisma.schedule.update({
                where: {
                    id: schedule_id
                },
                data: {
                    team_members: {
                        connect: {
                            person_id: person_id
                        }
                    }
                },
            });
            res.status(200).json({ response: `Added person with id ${person_id} to schedule with id ${schedule_id}` });
        }
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: `${error} : Error linking person to schedule` });
    }

}
