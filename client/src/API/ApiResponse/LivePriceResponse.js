import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";


const LivePriceResponse = () => {
  //get data variable from contextprovider
  const { LivePrice, setLivePrice } = useStateContext();

  //fetch,process and stored data
  const getPrice = async () => {
    const response =  await fetch(process.env.REACT_APP_LIVEPRICE_DATA);
    const responseJSON =  await response.json();

    //assign value to liveprice and store reponse in local storage for future need
   
      setLivePrice(responseJSON);
      localStorage.setItem("prevLiveRes", JSON.stringify(responseJSON));
    

    return LivePrice;
  };

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
