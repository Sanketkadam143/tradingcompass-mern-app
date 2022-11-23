import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import nocache from "nocache";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//disabling client side cache
app.use(nocache());
app.set('etag', false); 

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
