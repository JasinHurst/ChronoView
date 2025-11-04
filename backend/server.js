// ✅ ChronoView Server
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pool from "./db.js"; // PostgreSQL connection pool

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (_, res) => res.json({ message: "ChronoView API is running" }));

// ===========================================
// 🧩 SIGNUP ROUTE
// ===========================================
app.post("/api/users", async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      username,
      time_zone,
      birth_date,
    } = req.body;

    // Basic validation
    if (!email || !password || !first_name || !last_name || !username) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    // Hash password securely
    const password_hash = await bcrypt.hash(password, 10);

    // Insert into database using parameterized query
    const query = `
      INSERT INTO users (
        email, password_hash, first_name, last_name,
        username, time_zone, birth_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, first_name, last_name, username,
                time_zone, birth_date, verified, created_at;
    `;

    const values = [
      email,
      password_hash,
      first_name,
      last_name,
      username,
      time_zone,
      birth_date,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      error:
        err.code === "23505"
          ? "Email or username already exists"
          : "Server error",
    });
  }
});

// ===========================================
// 🔐 LOGIN ROUTE
// ===========================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Look up user by email
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];

    // Compare hashed passwords
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Update last_login timestamp
    await pool.query("UPDATE users SET last_login = NOW() WHERE id = $1", [
      user.id,
    ]);

    // Respond with safe user info only
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===========================================
// 🚀 START SERVER
// ===========================================
app.listen(5000, () => console.log("✅ Server running on port 5000"));
