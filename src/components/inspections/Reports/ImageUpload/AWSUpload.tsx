// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { upload } from "./s3Config"

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    upload.single('image')(req as any, res as any, async (error) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const file = (req as any).file;
      res.status(200).json({ 
        success: true, 
        fileUrl: file.location 
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
};

export default handler;