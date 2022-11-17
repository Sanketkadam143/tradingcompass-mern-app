import React, { useContext, createContext, useState } from 'react'
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
const StateContext = createContext();

//set all the values which will be used globally 
export const ContextProvider = ({ children }) => {
    const theme = useTheme();

    const [NiftyData, setNiftyData] = useState(JSON.parse(localStorage.getItem('prevNiftyRes')) ||[]);
    const [BankData, setBankData] = useState(JSON.parse(localStorage.getItem('prevBankRes'))||[]);
    const [LivePrice, setLivePrice] = useState(JSON.parse(localStorage.getItem('prevLiveRes'))||[]);
    const [StockData, setStockData] = useState(JSON.parse(localStorage.getItem('prevStockRes'))||[]);
    const[marketStatus,setMarketStatus]=useState([])
    const[isMatch,setisMatch]=useState(useMediaQuery(theme.breakpoints.down("md")));
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('profile')));
    const[niftyDaydata,setNiftyDaydata]=useState([]);
    const[bankDaydata,setBankDaydata]=useState([]);
   const [niftyTimestamp,setNiftyTimestamp]=useState(null);
   const [bankTimestamp,setBankTimestamp]=useState(null);
   const [stockTimestamp,setStockTimestamp]=useState(null);

    return (
        <StateContext.Provider
            value={{ NiftyData,setNiftyData,BankData,setBankData,LivePrice, setLivePrice,StockData,setStockData,isMatch,setisMatch,user,setUser,marketStatus,setMarketStatus,niftyDaydata,setNiftyDaydata,bankDaydata,setBankDaydata,niftyTimestamp,setNiftyTimestamp,bankTimestamp,setBankTimestamp,stockTimestamp,setStockTimestamp}}>
  
            {children}

        </StateContext.Provider>


    )
}

export const useStateContext = () => useContext(StateContext);