// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ex = (req.query.fileType as string).split("/")[1];

  const Key = `${randomUUID()}.${ex}`;

  const s3Params = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ContentLength: parseInt(req.query.fileLength as string),
    ContentType: `image/${ex}`,
  });

  const uploadUrl = await getSignedUrl(s3, s3Params, {
    expiresIn: 3600,
  });

  console.log("uploadUrl", uploadUrl);
  const contentUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
  res.status(200).json({
    uploadUrl,
    contentUrl,
    key: Key,
  });
}