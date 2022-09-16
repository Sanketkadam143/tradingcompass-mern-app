import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const NiftyResponse = () => {
  //get data variable from contextprovider

  const { NiftyData, setNiftyData } = useStateContext();

  //fetch,process and stored data

  const getNiftyChain = async () => {
    try {
      const response = await fetch(
        "https://trading-compass.herokuapp.com/api/nifty"
      );
      const responseJSON = await response.json();

      const data = responseJSON[0].data;

      //take roundoff live price to find the index of strike price
      const roundoff = responseJSON[0].underlyingValue % 50;
      const niftyLivePrice = responseJSON[0].underlyingValue - roundoff;

      //finding index of live strike price
      const pricePosition = data?.findIndex(
        (element) => element?.strikePrice === niftyLivePrice
      );

      const nifty = data?.slice(pricePosition - 20, pricePosition + 22);

      //assign value to niftydata and store reponse in local storage for future need

      nifty.length === 42 && setNiftyData(nifty);
      nifty.length === 42 &&
        localStorage.setItem("prevNiftyRes", JSON.stringify(nifty));

      //  nifty !== undefined && localStorage.setItem("prevNiftyRes", JSON.stringify(nifty));

      return NiftyData;
    } catch (error) {
      console.log(error);
    }
  };
  //trigger function to call api
  useEffect(() => {
    getNiftyChain();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //trigger function to call api

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() % 1 === 0) {
        getNiftyChain();
      }
    }, 20000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default NiftyResponse;
