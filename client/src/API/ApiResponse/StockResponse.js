import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";


const StockResponse = () => {

   //get data variable from contextprovider

  const { StockData, setStockData } = useStateContext();

    //fetch,process and stored data

  const getstockPrice =  async () => {
    const response =  await fetch(
      process.env.REACT_APP_STOCKS_DATA
    );
    const responseJSON =  await response.json();
    const data=responseJSON


 //assign value to stockdata and store reponse in local storage for future need

    setStockData(data);
    localStorage.setItem("prevStockRes", JSON.stringify(data));

    return StockData;
  };

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
