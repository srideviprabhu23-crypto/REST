import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./db.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/restaurants", (req, res) => {
    try {
      const restaurants = db.prepare('SELECT * FROM restaurants').all();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  });

  app.get("/api/foods", (req, res) => {
    try {
      const foods = db.prepare('SELECT * FROM foods').all();
      res.json(foods);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch foods" });
    }
  });

  app.post("/api/bookings", (req, res) => {
    const { restaurant_id, user_name, booking_date, guests } = req.body;
    try {
      const info = db.prepare('INSERT INTO bookings (restaurant_id, user_name, booking_date, guests) VALUES (?, ?, ?, ?)').run(restaurant_id, user_name, booking_date, guests);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root: "dist" });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
