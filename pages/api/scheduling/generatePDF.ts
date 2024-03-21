import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import PDFDocument from "pdfkit";
import {CleanType} from "@prisma/client";
import {PassThrough} from "node:stream";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const {
                schedule_data
            } : {schedule_data : [{id: number, start_time: Date, end_time: Date, clean_type: CleanType, room_id: number}]}
                = req.body;

            const schedulePDFData = await generatePDF(schedule_data);
            res.status(200).json({pdfData: schedulePDFData});

        }
    } catch (error) {
        res.status(500).json(error + " :Error generating pdf");
    }
}

const getRoomName = async (room_id: number) => {
    const room = await prisma.room.findUnique({
        where: {
            id: room_id
        }
    });
    return room.name;
}

//TODO: Complete document formatting and testing
const generatePDF = async (schedule_data: [{id: number, start_time: Date, end_time: Date, clean_type: CleanType, room_id: number}]) => {
    const doc = new PDFDocument();

    doc.fontSize(25).text('Schedule', {
        align: 'center'
    });

    for (let i = 0; i < schedule_data.length; i++) {
        const room_name = await getRoomName(schedule_data[i].room_id);
        doc.fontSize(15).text(`Room: ${room_name}`);
        doc.fontSize(15).text(`Start Time: ${schedule_data[i].start_time}`);
        doc.fontSize(15).text(`End Time: ${schedule_data[i].end_time}`);
        doc.fontSize(15).text(`Clean Type: ${schedule_data[i].clean_type}`);
    }

    const chunks = [];
    const stream = doc.pipe(new PassThrough());
    doc.on('data', (chunk) => {
        chunks.push(chunk);
    });

    doc.end();

    let data : string = undefined;
    stream.on('end', () => {
        data = Buffer.concat(chunks).toString('base64');
    });

    return data;
}
