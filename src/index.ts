// Imports
import express from "express";
import dotenv from "dotenv";

import { ServerInitializer } from "./middlewares/ServerInitializer.middleware.js";

async function main() {
  const app = express();
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }))
  dotenv.config();
  ServerInitializer(app);
}

main();
