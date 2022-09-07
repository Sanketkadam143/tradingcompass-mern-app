import express from "express"
const app = express()
import cors from "cors"
import axios from "axios"
import * as dotenv from 'dotenv'
dotenv.config()
// import path from 'path';
// import {fileURLToPath} from 'url';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "client", "build")))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// })

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:'*'
}))

app.get("/api/nifty", async (req,res)=>{

    axios.get("https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY").then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })
  
})

app.get("/api/banknifty", async (req,res)=>{

    axios.get("https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY").then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })
  
})

app.get("/api/stocks", async (req,res)=>{

    axios.get("https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050").then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })
  
})

app.get("/api/liveprice", async (req,res)=>{

    axios.get("https://www.nseindia.com/api/allIndices").then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })

  
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}


app.listen(PORT,()=> {
    console.log(`listening on port ${PORT}`)
})