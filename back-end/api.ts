import express from "express";

const app = express();

app.use(express.json());

app.use("/api", require("./routes/team_members"));
app.use("/api", require("./routes/points"));
app.use("/api", require("./routes/users"));

// PORT can be set in .env file
app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
