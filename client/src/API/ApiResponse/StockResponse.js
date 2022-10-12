import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const StockResponse = () => {
  //get data variable from contextprovider

  const { StockData, setStockData,setMarketStatus} = useStateContext();

  //fetch,process and stored data

  const getstockPrice = async () => {
    try {
      const response = await fetch(
        "https://trading-compass.herokuapp.com/api/stocks"
      );
      const responseJSON = await response.json();
      const data = responseJSON[0].data[0];
      setMarketStatus((responseJSON[0].marketStatus));
      
      //assign value to stockdata and store reponse in local storage for future need
      
      data.length === 51 && setStockData(data);
      data.length === 51 &&
        localStorage.setItem("prevStockRes", JSON.stringify(data));

      

      return StockData;
    } catch (error) {
      console.log(error);
    }
  };

  //trigger function to call api
  useEffect(() => {
    getstockPrice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //trigger function to call api

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() % 1 === 0) {
        getstockPrice();
      }
    }, 20000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default StockResponse;
