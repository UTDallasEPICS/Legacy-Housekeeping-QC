import express from 'express'
import multer from 'multer'
import crypto from 'crypto'

//import sharp to allow resizing of the image
import sharp from 'sharp'

import { PrismaClient } from '@prisma/client'

import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'


import dotenv from 'dotenv'

dotenv.config()

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_REGION
const accessKey = process.env.AWS_API_KEY
const secretAccessKey = process.env.AWS_SECRET

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    
    }, 
    region: bucketRegion,
})

const app = express()
const prisma = new PrismaClient()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get("/api/posts",  async (req, res) =>{
    const posts = await prisma.posts.findMany({orderBy:[{created: 'desc'}]})
    res.send(posts)
})

//upload.single('__') needs to match middleware (the react/next part of code)
//its names image in example code
app.post('/api/posts', upload.single('image'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)
   
   //Resize the image (in the data base)
    const buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "contain"}).toBuffer()

    const imageName = randomImageName()
    const params = {
        Bucket: bucketName, 
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    } 
    const command = new PutObjectCommand(params)
    await s3.send(command)

    const post = await prisma.posts.create({
        data: {
            caption: req.body.caption, 
            ImageName: imageName
        }
    })


    res.send(post)
    })

app.delete("/api/posts/:id", async (req, res) => {
    const id = +req.params.id
    res.send({})
})

app.listen(8080, () => console.log("listening on port 8080"))