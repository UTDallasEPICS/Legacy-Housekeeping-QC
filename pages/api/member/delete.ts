import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.query;

      // Check if the member exists
      const member = await prisma.person.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!member) {
        return res.status(404).json({ error: "Record to delete does not exist" });
      }

      // Proceed with deletion
      await prisma.person.delete({
        where: { id: parseInt(id as string) },
      });

      res.status(200).json({ message: "Member deleted successfully" });
    } else {
      res.status(405).end();
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting member. " + err.message });
  }
}