// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import multer from 'multer';

// AWS S3 Configuration using AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Helper function to upload a file to S3
const uploadToS3 = async (file: Express.Multer.File) => {
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `${Date.now()}-${file.originalname}`, // Generate a unique key for the file
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read' as ObjectCannedACL, // Explicitly typing ACL as ObjectCannedACL
  };

  const command = new PutObjectCommand(uploadParams);
  const response = await s3Client.send(command);
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
};

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '8mb',
  },
};

// API Route Handler for File Upload
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Multer middleware to handle the file upload
    upload.single('image')(req as any, res as any, async (err: any) => {
      if (err) {
        console.error('Multer upload error:', err);
        return res.status(500).json({ error: err.message });
      }

      const file = (req as any).file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        // Upload the file to S3 and get the file URL
        const fileUrl = await uploadToS3(file);

        res.status(200).json({
          success: true,
          fileUrl,
        });
      } catch (uploadError) {
        console.error('S3 upload error:', uploadError);
        res.status(500).json({ error: 'Error uploading file to S3' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

// Frontend handler function for uploading files
export const handleFileUpload = async (files: File[], setRoomPics: Function, roomPics: any[]) => {
  for (let file of files) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { fileUrl } = await res.json();
        setRoomPics([
          ...roomPics,
          {
            name: file.name,
            url: fileUrl, // Use the returned S3 file URL
          },
        ]);
      } else {
        console.error('Upload failed', res.statusText);
      }
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }
};

export default handler;
