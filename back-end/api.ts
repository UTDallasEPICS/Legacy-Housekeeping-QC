import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

// Add a Team Member, points is optional default 0
app.post("/addMember", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const member = await prisma.team_Members.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  });
  // For testing purposes
  console.log(member);
  res.json(member);
});

// Add Points to a team member
app.post("/addPoints", async (req, res) => {
  const { points, team_member_id } = req.body;

  const userExists = await prisma.team_Members.findUnique({
    where: {
      member_id: team_member_id,
    },
  });

  if (!userExists) {
    return res.status(400).json({
      msg: "user not found",
    });
  }

  const addedPoints = await prisma.points.create({
    data: {
      points: points,
      team_member_id: team_member_id,
    },
  });
  // For testing purposes
  console.log(addedPoints);
  res.json(addedPoints);
});

// Get all the Team Members with points and time stamp
app.get("/members", async (req, res) => {
  const members = await prisma.team_Members.findMany({
    include: {
      points: {
        select: {
          points: true,
          time_stamp: true,
          points_id: true,
        },
      },
    },
  });
  res.json(members);
});

// Get a Team Member by id
app.get("/member/:id", async (req, res) => {
  const id = req.params.id;
  const member = await prisma.team_Members.findUnique({
    where: {
      member_id: id,
    },
    include: {
      points: {
        select: {
          points: true,
          //time_stamp: true,
        },
      },
    },
  });
  res.json(member);
  console.log(member);
});

// Update a Team Member
app.put("/updateMember", async (req, res) => {
  const { id, first_name, last_name, email } = req.body;
  const updatedMember = await prisma.team_Members.update({
    where: {
      member_id: id,
    },
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  });
  // Testing purposes
  res.json(updatedMember);
  console.log(updatedMember);
});

// Delete a Team Member
app.delete("/deleteMember/:id", (req, res) => {
  const id = req.params.id;
  const deletedMember = prisma.team_Members.delete({
    where: {
      member_id: id,
    },
  });
  console.log(deletedMember);
  res.json(deletedMember);
});

app.post("/addUser", async (req, res) => {
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

// PORT can be set in .env file
app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
