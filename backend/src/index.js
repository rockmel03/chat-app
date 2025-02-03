import dotenv from "dotenv";
dotenv.config({
  path: "src/.env",
});

import { createServer } from "http";
import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 3000;

const server = createServer(app);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listning on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
