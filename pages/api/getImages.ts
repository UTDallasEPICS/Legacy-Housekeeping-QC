// File: /pages/api/getImages.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { inspection_id } = req.query;
      
      const images = await prisma.image.findMany({
        where: {
          inspection_id: Number(inspection_id)
        }
      });
      console.log("Fetched images:", images); // Add this line to log the fetched images
      res.status(200).json(images);
    } catch (error) {
      console.error("Failed to fetch images:", error); // Add this line to log any errors
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}