import {socket} from "./index"
import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";


const useSocketConnection = () => {
  const {
    setNiftyData,
    setNiftyDaydata,
    setNiftyTimestamp,
    setBankData,
    setBankDaydata,
    setBankTimestamp,
    setLivePrice,
    setIndexTimestamp,
    setStockData,
    setMarketStatus,
    setStockTimestamp,
    setNiftyPrice,
    setBankPrice,
  } = useStateContext();

  const update = (old, res) => {
    old[0]?.datedata.push(res);
    return old;
  };

  useEffect(() => {
    socket.on("niftydata", (res) => {
      setNiftyDaydata(res);
      const daydata = res[0].datedata;
      const nifty = res[0].datedata[daydata.length - 1]?.data;
      setNiftyTimestamp(res[0]?.datedata[daydata.length - 1]?.timestamp);
      setNiftyData(nifty);
      setNiftyPrice(res[0].datedata[daydata.length - 1].indexLTP);
      localStorage.setItem("prevNiftyRes", JSON.stringify(nifty));
    });

    socket.on("bankdata", (res) => {
      setBankDaydata(res);
      const daydata = res[0].datedata;
      const bank = res[0].datedata[daydata.length - 1]?.data;
      setBankTimestamp(res[0]?.datedata[daydata.length - 1]?.timestamp);
      setBankData(bank);
      setBankPrice(res[0].datedata[daydata.length - 1].indexLTP);
      localStorage.setItem("prevBankRes", JSON.stringify(bank));
    });

    socket.on("indexprice", (res) => {
      setIndexTimestamp(res[0]?.timestamp);
      setLivePrice(res);
      localStorage.setItem("prevLiveRes", JSON.stringify(res));
    });

    socket.on("stocks", (res) => {
      const data = res[0]?.stockdata;
      setMarketStatus(res[0]?.marketStatus);
      setStockTimestamp(res[0]?.timestamp);
      setStockData(data);
      localStorage.setItem("prevStockRes", JSON.stringify(data));
    });

    socket.on("updateNifty", (res) => {
      setNiftyData(res.data);
      setNiftyTimestamp(res.timestamp);
      setNiftyPrice(res.indexLTP);
      setNiftyDaydata((old) => update(old, res));
    });

    socket.on("updateBank", (res) => {
      setBankData(res.data);
      setBankTimestamp(res.timestamp);
      setBankPrice(res.indexLTP);
      setBankDaydata((old) => update(old, res));
    });

    // socket.on("updateOrders",(res)=>{
    //   dispatch({ type: FETCH_ALL, payload: res });
    // })

    return () => {
      socket.off("niftydata");
      socket.off("bankdata");
      socket.off("indexprice");
      socket.off("stocks");
      socket.off("updateNifty");
      socket.off("updateBank");
     // socket.off("updateOrders");
    };

    // eslint-disable-next-line
  }, []);

  return socket;
};

export default useSocketConnection;
