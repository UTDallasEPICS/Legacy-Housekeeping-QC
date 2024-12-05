// File: /pages/api/deleteImage.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await prisma.image.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}