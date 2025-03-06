import "./config/loadEnv.js"; // load environment variables at first
import { createServer } from "http";
import app from "./app.js";
import connectDB from "./db/index.js";
import initSocketServer from "./socket/index.js";

const port = process.env.PORT || 3000;

const server = createServer(app);

try {
  initSocketServer(server);
} catch (error) {
  console.log("Failed to start socket io server");
}

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
