import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.query;

      const person = await prisma.person.delete({
        where: { id: parseInt(id[0]) },
      });

      res.status(200).json({ message: "Member deleted successfully" });
    } else {
      res.status(405).end();
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting member. " + err.message });
  }
}
