import React, { useContext, createContext, useState } from 'react'
import { liveDefaultRes } from '../API/DefaultResponse/liveDefaultRes';
import { niftyDefaultRes } from '../API/DefaultResponse/niftyDefaultRes';
import { bankDefaultRes } from '../API/DefaultResponse/bankDefaultRes';
import { stockDefaultRes } from '../API/DefaultResponse/stockDefaultRes';



const StateContext = createContext();

//set all the values which will be used globally 
export const ContextProvider = ({ children }) => {

    const [NiftyData, setNiftyData] = useState(JSON.parse(localStorage.getItem('prevNiftyRes')) ||[]);
    const [BankData, setBankData] = useState(JSON.parse(localStorage.getItem('prevBankRes'))||[]);
    const [LivePrice, setLivePrice] = useState(JSON.parse(localStorage.getItem('prevLiveRes'))||[]);
    const [StockData, setStockData] = useState(JSON.parse(localStorage.getItem('prevStockRes'))||[]);
    const[isMatch,setisMatch]=useState(false)
    const[result,setresult]=useState({});
    const[token,settoken]=useState({});
    const[user,setUser]=useState()
    const[orderBook,setOrderBook]=useState( JSON.parse(localStorage.getItem('orderBook')) !== null ? JSON.parse(localStorage.getItem('orderBook')): [])
   


  
    return (
        <StateContext.Provider
            value={{ NiftyData,setNiftyData,BankData,setBankData,LivePrice, setLivePrice,StockData,setStockData,isMatch,setisMatch,result,setresult,token,settoken ,user,setUser,orderBook,setOrderBook}}>
  
            {children}

        </StateContext.Provider>


    )
}

export const useStateContext = () => useContext(StateContext);