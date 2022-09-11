import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

// import path from 'path';
// import {fileURLToPath} from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "client", "build")))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// })

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;
var database;


app.use(
  cors({
    origin: "https://tradingcompass.herokuapp.com/",
  })
);

app.get("/api/nifty", async (req, res) => {
   await database.collection("nifty options").find({}).toArray((err, result) => {
    try {
      res.send(result);
    } catch (err) {}
  });
 
});

app.get("/api/banknifty", async (req, res) => {
    await database.collection("bank nifty options").find({}).toArray((err, result) => {
        try {
          res.send(result);
        } catch (err) {}
      });
});

app.get("/api/stocks", async (req, res) => {
    await database.collection("stocks").find({}).toArray((err, result) => {
        try {
          res.send(result);
        } catch (err) {}
      });
});

app.get("/api/liveprice", async (req, res) => {
    await database.collection("index prices").find({}).toArray((err, result) => {
        try {
          res.send(result);
        } catch (err) {}
      });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (result) => (database = result.db("test")),
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
