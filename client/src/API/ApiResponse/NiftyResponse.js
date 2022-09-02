import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";


const NiftyResponse = () => {
  //get data variable from contextprovider

  const { NiftyData, setNiftyData, LivePrice } = useStateContext();

  //take roundoff live price to find the index of strike price
  const roundoff = LivePrice?.data[0]?.last % 50;
  const niftyLivePrice = LivePrice?.data[0]?.last - roundoff;

  //fetch,process and stored data

  const getNiftyChain =  async () => {
    const response =  await fetch("https://tradingcompass.herokuapp.com/api/nifty");
    const responseJSON =  await response.json();
 
    const data = responseJSON.filtered?.data;

    //finding index of live strike price
    const pricePosition = data?.findIndex(
      (element) => element?.strikePrice === niftyLivePrice
    );

    const nifty = data?.slice(pricePosition - 20, pricePosition + 22);
   
    //assign value to niftydata and store reponse in local storage for future need

    nifty !== undefined && setNiftyData(nifty);
    nifty !== undefined && localStorage.setItem("prevNiftyRes", JSON.stringify(nifty));

    //  nifty !== undefined && localStorage.setItem("prevNiftyRes", JSON.stringify(nifty));

    return NiftyData;
  };

  //trigger function to call api

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() % 2 === 0) {
        getNiftyChain();
      }
    }, 20000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default NiftyResponse;
