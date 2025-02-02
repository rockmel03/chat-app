import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.send("hellow world!");
});

export default app;
