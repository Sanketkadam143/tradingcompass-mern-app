
import { useStateContext } from "../../Contexts/ContextProvider";

const Calculateprofit = (orderDetails) => {

    const {
        NiftyData,
        BankData,
      } = useStateContext();

      const brokerage = parseInt(orderDetails.lots) * 50;

    let latestPrice =
    orderDetails?.indexName === "NIFTY"
      ? orderDetails?.optionType === "CE"
        ? NiftyData[
            NiftyData?.findIndex((element) => element?.stp === orderDetails?.stp)
          ]?.CE?.LTP
        : NiftyData[
            NiftyData?.findIndex((element) => element?.stp === orderDetails?.stp)
          ]?.PE?.LTP
      : orderDetails?.optionType === "CE"
      ? BankData[
          BankData?.findIndex((element) => element?.stp === orderDetails?.stp)
        ]?.CE?.LTP
      : BankData[
          BankData?.findIndex((element) => element?.stp === orderDetails?.stp)
        ]?.PE?.LTP;

  let profit =orderDetails?.sellPrice!==undefined
    ? (
        (orderDetails?.sellPrice - orderDetails?.buyPrice) *
        (orderDetails?.indexName === "NIFTY" ? 50 : 25) *
        orderDetails?.lots
      ).toFixed(2)-brokerage
    : (
        (latestPrice - orderDetails?.buyPrice) *
        (orderDetails?.indexName === "NIFTY" ? 50 : 25) *
        orderDetails?.lots
      ).toFixed(2);



     
  return {latestPrice,profit};

}

export default Calculateprofit
