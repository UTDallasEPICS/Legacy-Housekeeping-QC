const router = require("express").Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

router.post("/addUser", async (req: Request, res: Response) => {
  const { first_name, last_name, email, phone_number, address } = req.body;
  const user = await prisma.user.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      address: address,
    },
  });
  console.log(user);
  res.json(user);
});

module.exports = router;
