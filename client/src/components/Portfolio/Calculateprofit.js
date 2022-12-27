import { useStateContext } from "../../Contexts/ContextProvider";

const Calculateprofit = (orderDetails) => {
  const { NiftyData, BankData, StockData } = useStateContext();

  
  var latestPrice = 0;
  var profit = 0;
  if (orderDetails.orderType !== "stockBuying") {
    const brokerage = parseInt(orderDetails.lots) * 50;
    latestPrice =
      orderDetails?.symbol === "NIFTY"
        ? orderDetails?.optionType === "CE"
          ? NiftyData[
              NiftyData?.findIndex(
                (element) => element?.stp === orderDetails?.stp
              )
            ]?.CE?.LTP
          : NiftyData[
              NiftyData?.findIndex(
                (element) => element?.stp === orderDetails?.stp
              )
            ]?.PE?.LTP
        : orderDetails?.optionType === "CE"
        ? BankData[
            BankData?.findIndex((element) => element?.stp === orderDetails?.stp)
          ]?.CE?.LTP
        : BankData[
            BankData?.findIndex((element) => element?.stp === orderDetails?.stp)
          ]?.PE?.LTP;

    profit =
      orderDetails?.sellPrice !== undefined
        ? (
            (orderDetails?.sellPrice - orderDetails?.buyPrice) *
            (orderDetails?.symbol === "NIFTY" ? 50 : 25) *
            (orderDetails?.lots)- brokerage
          ).toFixed(2) 
        : (
            (latestPrice - orderDetails?.buyPrice) *
            (orderDetails?.symbol === "NIFTY" ? 50 : 25) *
            (orderDetails?.lots)
          ).toFixed(2);
  }
 
  if (orderDetails.orderType === "stockBuying") {
    const brokerage = parseInt(orderDetails.lots) * 5;
    
    latestPrice=StockData[
      StockData?.findIndex(
        (element) => element?.symbol === orderDetails?.symbol
      )
    ]?.last;
   
    
    profit =
      orderDetails?.sellPrice !== undefined
        ? (
            (orderDetails?.sellPrice - orderDetails?.buyPrice) *
            (orderDetails?.lots)- brokerage
          ).toFixed(2) 
        : (
            (latestPrice - orderDetails?.buyPrice) *
           ( orderDetails?.lots)
          ).toFixed(2);

  }

  orderDetails?.orderType === "optionSelling" && (profit = -profit);


  return { latestPrice, profit };
};

export default Calculateprofit;
