import express, { json } from "express";
import fetch from "node-fetch";
const app = express();
const port = 3000;

import cors from "cors";
app.use(cors());

app.use(json());

app.get("/api/trips", async (req, res) => {
  try {
    const response = await fetch(
      "https://rapidtechinsights.github.io/hr-assignment/recent.json"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trips data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
