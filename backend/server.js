import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.json({ message: "ChronoView API is running" }));


app.post("/api/users", async (req, res) => {
  try {
    const { email, password_hash, display_name } = req.body;
    const query = `
      INSERT INTO users (email, password_hash, display_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, display_name, created_at`;
    const result = await pool.query(query, [email, password_hash, display_name]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.code === "23505" ? "Email already exists" : "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));

