import React, { useContext, createContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const StateContext = createContext();

//set all the values which will be used globally
export const ContextProvider = ({ children }) => {
  const theme = useTheme();

  const [NiftyData, setNiftyData] = useState([]);
  const [BankData, setBankData] = useState([]);
  const [LivePrice, setLivePrice] = useState([]);
  const [StockData, setStockData] = useState([]);
  const [marketStatus, setMarketStatus] = useState([]);
  const [isMatch, setisMatch] = useState(
    useMediaQuery(theme.breakpoints.down("md"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [niftyDaydata, setNiftyDaydata] = useState([]);
  const [bankDaydata, setBankDaydata] = useState([]);
  const [niftyTimestamp, setNiftyTimestamp] = useState(null);
  const [bankTimestamp, setBankTimestamp] = useState(null);
  const [stockTimestamp, setStockTimestamp] = useState(null);
  const [indexTimestamp, setIndexTimestamp] = useState(
    JSON.parse(localStorage.getItem("prevLiveRes"))?.[0]?.timestamp || null
  );
  const [niftyPrice, setNiftyPrice] = useState(0);
  const [bankPrice, setBankPrice] = useState(0);

  return (
    <StateContext.Provider
      value={{
        NiftyData,
        setNiftyData,
        BankData,
        setBankData,
        LivePrice,
        setLivePrice,
        StockData,
        setStockData,
        isMatch,
        setisMatch,
        user,
        setUser,
        marketStatus,
        setMarketStatus,
        niftyDaydata,
        setNiftyDaydata,
        bankDaydata,
        setBankDaydata,
        niftyTimestamp,
        setNiftyTimestamp,
        bankTimestamp,
        setBankTimestamp,
        stockTimestamp,
        setStockTimestamp,
        indexTimestamp,
        setIndexTimestamp,
        niftyPrice,
        setNiftyPrice,
        bankPrice,
        setBankPrice,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
