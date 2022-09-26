import React from "react";
import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const BankResponse = () => {
  //get data variable from contextprovider
  const { BankData, setBankData } = useStateContext();

  //fetch,process and stored data
  const getBankChain = async () => {
    try {
      const response = await fetch(
        "https://trading-compass.herokuapp.com/api/banknifty"
      );
      const responseJSON = await response.json();
      const datedata = responseJSON[0].datedata;
      const bank = responseJSON[0].datedata[datedata.length - 1].data;

      //assign value to bankdata and store reponse in local storage for future need

      bank.length === 42 && setBankData(bank);
      bank.length === 42 &&
        localStorage.setItem("prevBankRes", JSON.stringify(bank));

      return BankData;
    } catch (error) {
      console.log(error);
    }
  };
  //trigger function to call api
  useEffect(() => {
    getBankChain();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
