import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to load environment variables from a custom path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Components
import Connection from './database/db.js';
import Router from './routes/route.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

// Update __dirname1 to point to the correct directory
const __dirname1 = 'D:/Laukik-Blog app/client/build';

if (process.env.NODE_ENV === "production") {
  // Serve static files from the updated build directory
  app.use(express.static(__dirname1));

  // Serve index.html for all routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const PORT = process.env.PORT || 5000;

Connection();

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
