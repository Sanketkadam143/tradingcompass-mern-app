import React from "react";
import TopOI from "../components/Charts/TrendingOI";
import { useStateContext } from "../Contexts/ContextProvider";

const TrendingOI = () => {
  const { bankDaydata, niftyDaydata, ismatch } = useStateContext();

  return (
    <>
      <div style={{ margin: ismatch ? "1em" : "7em" }}>
        <TopOI indexData={niftyDaydata[0]?.datedata} name="Nifty" />
        <TopOI indexData={bankDaydata[0]?.datedata} name="Bank Nifty" />
      </div>
    </>
  );
};

export default TrendingOI;
