import React ,{useEffect}from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Pages/Home";
import { useSnackbar } from 'notistack';
import Navbar from "./components/Navbar/Navbar";
import SecNav from "./components/Navbar/SecNav";
import NiftyResponse from "./API/ApiResponse/NiftyResponse";
import BankResponse from "./API/ApiResponse/BankResponse";
import LivePriceResponse from "./API/ApiResponse/LivePriceResponse";
import BottomNav from "./components/Navbar/BottomNav";
import NiftyPage from "./Pages/NiftyPage";
import BankPage from "./Pages/BankPage";
import OIanalysisPage from "./Pages/OIanalysisPage";
import StockResponse from "./API/ApiResponse/StockResponse";
import Auth from "./components/Auth/Auth";
import { useStateContext } from "./Contexts/ContextProvider";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Disclaimer from "./Pages/Disclaimer";
import About from "./Pages/About";
import Position from "./components/Portfolio/Position";
import useNetworkStatus from "./Contexts/Networkstatus";
import Offlinepage from "./Pages/Offlinepage";
import Selecttime from "./components/TimeperiodOI/Selecttime";
import CallvsPutpage from "./Pages/CallvsPutpage";
import ResetPass from "./components/Auth/ResetPass";
import {getOrders} from './actions/order'
import { CLIENT_MSG } from "./constants/actionTypes";



const Imports=()=>{
  const dispatch=useDispatch();
  const { user } = useStateContext();
  const { isOnline } = useNetworkStatus();
  const message = useSelector((state) => state.auth.message?.info);
  const status = useSelector((state) => state.auth.message?.status);
  const  {enqueueSnackbar}  = useSnackbar();

  useEffect(()=>{
   user && dispatch(getOrders());
  },[dispatch,user])


  useEffect(() => {
    (status === 404 || status === 400 || status === 500) &&
      enqueueSnackbar(message, { variant: "error" });

    status === 200 && enqueueSnackbar(message, { variant: "success" });

    status === 0 && enqueueSnackbar("Network Error", { variant: "error" });

    dispatch({ type: CLIENT_MSG, message: { info: null, status: null } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);


  return (
  <>
      <Navbar />
      <SecNav />

      <div className="App" style={{ marginTop: "10em" }}>
        {isOnline ? (
          <>
            <NiftyResponse />
            <BankResponse />
            <LivePriceResponse />
            <StockResponse />

            <Routes>
              <Route exact path="/" element={user ? <Home /> : <Auth />} />
              <Route exact path="/auth" element={<Auth />} />
              <Route
                path="/nifty50"
                element={user ? <NiftyPage /> : <Auth />}
              />
              <Route
                path="/niftybank"
                element={user ? <BankPage /> : <Auth />}
              />
              <Route
                path="/portfolio"
                element={user ? <Position /> : <Auth />}
              />
              <Route
                path="/oianalysis"
                element={user ? <OIanalysisPage /> : <Auth />}
              />

              <Route exact path="/oi-intervalwise" element={user ? <Selecttime />: <Auth />}/>
              <Route exact path="/callvsput" element={user ?  <CallvsPutpage/>: <Auth />}/>

              <Route exact path="/forget-password" element={<ResetPass />} />
              <Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route exact path="/disclaimer" element={<Disclaimer />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </>
        ) : (
          <Offlinepage />
        )}
      </div>
      <BottomNav />
      </>
  );
}

export default Imports;
