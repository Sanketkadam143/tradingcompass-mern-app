import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const LivePriceResponse = () => {
  //get data variable from contextprovider
  const { LivePrice, setLivePrice } = useStateContext();

  //fetch,process and stored data
  const getPrice = async () => {
    try {
      const response = await fetch(
        "https://trading-compass.herokuapp.com/api/liveprice"
      );
      const responseJSON = await response.json();
    
      //assign value to liveprice and store response in local storage for future need

      responseJSON[0].data.length === 71 && setLivePrice(responseJSON);
      responseJSON[0].data.length === 71 &&
        localStorage.setItem("prevLiveRes", JSON.stringify(responseJSON));

      return LivePrice;
    } catch (error) {
      console.log(error);
    }
  };

  //trigger function to call api
  useEffect(() => {
    getPrice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //trigger function to call api
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() % 1 === 0) {
        getPrice();
      }
    }, 20000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default LivePriceResponse;
