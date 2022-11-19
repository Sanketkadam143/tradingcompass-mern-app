import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const NiftyResponse = () => {
  //get data variable from contextprovider

  const { NiftyData, setNiftyData ,setNiftyDaydata,setNiftyTimestamp} = useStateContext();

  //fetch,process and stored data

  const getNiftyChain = async () => {
    try {
      const response = await fetch(
       process.env.REACT_APP_NIFTY_DATA
      );

      const responseJSON = await response.json();
      setNiftyDaydata( responseJSON)
      const daydata = responseJSON[0].datedata;
      const nifty = responseJSON[0].datedata[daydata.length - 1].data;
      
      setNiftyTimestamp(responseJSON[0]?.datedata[daydata.length - 1]?.timestamp)

      //assign value to niftydata and store reponse in local storage for future need

      nifty.length === 42 && setNiftyData(nifty);
      nifty.length === 42 &&
        localStorage.setItem("prevNiftyRes", JSON.stringify(nifty));


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
    }, 60000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default NiftyResponse;
