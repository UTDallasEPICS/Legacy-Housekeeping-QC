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
                date
            } = req.body;

            let query;

            if (date === undefined) {
                query = {
                        team_members: {
                            some: {
                                person_id: person_id
                            }
                        }
                    }
            }
            else {
                const dateOnly = date.split('T')[0];
                if (person_id === undefined){
                    query = {
                        start_time: {
                            gte: new Date(dateOnly),
                            lt: new Date(dateOnly + "T23:59:59")
                        }
                    }
                }
                else {
                    query = {
                        start_time: {
                            gte: new Date(dateOnly),
                            lt: new Date(dateOnly + "T23:59:59")
                        },
                        team_members: {
                            some: {
                                person_id: person_id
                            }
                        }
                    }
                }
            }

            const schedule = await prisma.schedule.findMany({
                where: query,
            });
            res.status(200).json(schedule);
        }
    } catch (error) {
        res.status(500).json(error + " :Error retrieving schedule");
    }
}
