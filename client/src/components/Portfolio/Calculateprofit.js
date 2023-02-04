import { useStateContext } from "../../Contexts/ContextProvider";

const Calculateprofit = (orderDetails) => {
  const { NiftyData, BankData, StockData } = useStateContext();

  // Declare variables that will be used in the function
  let latestPrice = 0;
  let profit = 0;
  let brokerage = 0;
  let optionType = "";
  let symbol = "";
  let lots = 0;
  let sellPrice = 0;
  let buyPrice = 0;

  // Check if the order is not a stock buying order
  if (orderDetails.orderType !== "stockBuying") {
    // Calculate the brokerage and set the symbol, option type, lots, sell price, and buy price variables
    brokerage = parseInt(orderDetails.lots) * 50;
    symbol = orderDetails?.symbol;
    optionType = orderDetails?.optionType;
    lots = orderDetails?.lots;
    sellPrice = orderDetails?.sellPrice;
    buyPrice = orderDetails?.buyPrice;

    // Find the latest price based on the symbol and option type
    if (symbol === "NIFTY") {
      latestPrice = NiftyData.find(
        (element) => element?.stp === orderDetails?.stp
      )?.[optionType]?.LTP;
    } else {
      latestPrice = BankData.find(
        (element) => element?.stp === orderDetails?.stp
      )?.[optionType]?.LTP;
    }

    // Calculate the profit
    if (sellPrice !== undefined) {
      profit = (
        (sellPrice - buyPrice) *
        (symbol === "NIFTY" ? 50 : 25) *
        lots -
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
  if (orderDetails.orderType === "stockBuying") {
    // Calculate the brokerage and set the symbol, lots, sell price, and buy price variables
    brokerage = parseInt(orderDetails.lots) * 5;
    symbol = orderDetails?.symbol;
    lots = orderDetails?.lots;
    sellPrice = orderDetails?.sellPrice;
    buyPrice = orderDetails?.buyPrice;

    // Find the latest price based on the symbol
    latestPrice = StockData.find(
      (element) => element?.symbol === symbol
    )?.last;

    // Calculate the profit
    if (sellPrice !== undefined) {
      profit =( (sellPrice - buyPrice) * (lots - brokerage)).toFixed(2);
    } else {
      profit = ((latestPrice - buyPrice) * lots).toFixed(2);
    }
  }

  // If the order is an option selling order, make the profit negative
  orderDetails?.orderType === "optionSelling" && (profit = -profit);
  
  return { latestPrice, profit };
};

export default Calculateprofit;
