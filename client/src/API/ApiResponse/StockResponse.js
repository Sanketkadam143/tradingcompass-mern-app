import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const StockResponse = () => {
  //get data variable from contextprovider

  const { StockData, setStockData,setMarketStatus,setStockTimestamp} = useStateContext();

  //fetch,process and stored data

  const getstockPrice = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_STOCKS_DATA
      );
      const responseJSON = await response.json();
      const data = responseJSON[0]?.data[0];
      const time= new Date(responseJSON[0]._id);
      setMarketStatus((responseJSON[0].marketStatus));
      setStockTimestamp(time.toLocaleString());
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
    }, 60000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default StockResponse;
