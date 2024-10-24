// pages/api/getImage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { key } = req.query;

  try {
    const params = {
      Bucket: 'dev-uploads.npts.tech',
      Key: key as string,
    };

    const data = await s3.getObject(params).promise();
    res.setHeader('Content-Type', data.ContentType || 'image/jpeg');
    res.send(data.Body);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving image' });
  }
}