import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

// Add a Team Member
app.post("/addMember", async (req, res) => {
  const { first_name, last_name, email, points } = req.body;
  const member = await prisma.team_Members.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      points: points,
    },
  });
  // For testing purposes
  console.log(member);
  res.json(member);
});

// Get all the Team Members
app.get("/members", async (req, res) => {
  const members = await prisma.team_Members.findMany();
  res.json(members);
});

// Get a Team Member by id
app.get("/member/:id", async (req, res) => {
  const id = req.params.id;
  const member = await prisma.team_Members.findUnique({
    where: {
      member_id: id,
    },
  });
  res.json(member);
  console.log(member);
});

// Update a Team Member
app.put("/updateMember", (req, res) => {
  const { id, first_name, last_name, email, points } = req.body;
  const updatedUser = prisma.team_Members.update({
    where: {
      member_id: id,
    },
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      points: points,
    },
  });
  // Testing purposes
  res.json(updatedUser);
  console.log(updatedUser);
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

// PORT can be set in .env file
app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
