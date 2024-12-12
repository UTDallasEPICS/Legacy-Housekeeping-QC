// File: /pages/api/saveImage.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url, inspection_id } = req.body;

    try {
      const image = await prisma.image.create({
        data: {
          url,
          inspection_id,
        },
      });
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}