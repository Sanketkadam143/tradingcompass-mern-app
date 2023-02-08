import { useStateContext } from "../../Contexts/ContextProvider";

const Calculateprofit = (orderDetails) => {
  const { NiftyData, BankData, StockData } = useStateContext();
  const { orderType, lots, symbol, optionType, sellPrice, buyPrice, stp } =
    orderDetails;

  let latestPrice = 0;
  let profit = 0;
  let brokerage = 0;

  if (orderType !== "stockBuying") {
    brokerage = parseInt(lots) * 50;

    // Find the latest price based on the symbol and option type
    if (symbol === "NIFTY") {
      latestPrice = NiftyData.find((element) => element?.stp === stp)?.[
        optionType
      ]?.LTP;
    } else {
      latestPrice = BankData.find((element) => element?.stp === stp)?.[
        optionType
      ]?.LTP;
    }

    // Calculate the profit
    if (sellPrice !== undefined) {
      profit = (
        (sellPrice - buyPrice) * (symbol === "NIFTY" ? 50 : 25) * lots -
        brokerage
      ).toFixed(2);
    } else {
      profit = (
        (latestPrice - buyPrice) *
        (symbol === "NIFTY" ? 50 : 25) *
        lots
      ).toFixed(2);
    }
  }

  // Check if the order is a stock buying order
  if (orderType === "stockBuying") {
    brokerage = parseInt(lots) * 5;
    latestPrice = StockData.find((element) => element?.symbol === symbol)?.last;

    // Calculate the profit
    if (sellPrice !== undefined) {
      profit = ((sellPrice - buyPrice) * lots - brokerage).toFixed(2);
    } else {
      profit = ((latestPrice - buyPrice) * lots).toFixed(2);
    }
  }

  // If the order is an option selling order, make the profit negative
  orderDetails?.orderType === "optionSelling" && (profit = -profit);

  return { latestPrice, profit };
};

export default Calculateprofit;
