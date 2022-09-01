import express from "express"
const app = express()
import cors from "cors"
import axios from "axios"
import * as dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:'*'
}))

app.get("/api/nifty", async (req,res)=>{

    axios.get(process.env.NIFTY_API).then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })
  
})

app.get("/api/banknifty", async (req,res)=>{

    axios.get(process.env.BANKNIFTY_API).then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })
  
})

app.get("/api/stocks", async (req,res)=>{

    axios.get(process.env.STOCKS_API).then(response=>{
        res.json(response.data)
    }).catch(error =>{
        // res.json(error)
    })
  
})

app.get("/api/liveprice", async (req,res)=>{

    axios.get(process.env.LIVEPRICE_API).then(response=>{
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