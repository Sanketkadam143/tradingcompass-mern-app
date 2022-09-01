import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";


const BankResponse = () => {
  //get data variable from contextprovider
  const { BankData, setBankData, LivePrice } = useStateContext();

  
//take roundoff live price to find the index of strike price
const roundoff=LivePrice?.data[18]?.last%100
const bankRoundOffPrice=(LivePrice?.data[18]?.last)-roundoff;

  //fetch,process and stored data
  const getBankChain =  async () => {
    const response = await fetch(
      process.env.REACT_APP_BANKNIFTY_DATA
    );
    const responseJSON =  await response.json();
    const data = responseJSON.filtered?.data;

    
   //finding index of live strike price
   const pricePosition = data?.findIndex( (element) => element?.strikePrice === (bankRoundOffPrice));
 
    const bank = data?.slice((pricePosition - 20), (pricePosition + 22));
  
   //assign value to bankdata and store reponse in local storage for future need
   

      bank !== undefined && setBankData(bank);
      bank !== undefined && localStorage.setItem("prevBankRes", JSON.stringify(bank));
    

    return BankData;
  };
  
  //trigger function to call api
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() % 1 === 0) {
        getBankChain();
      }
    }, 20000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default BankResponse;
