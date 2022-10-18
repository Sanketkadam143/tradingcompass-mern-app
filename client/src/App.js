import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material";
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

function App() {
  const { user } = useStateContext();
  const { isOnline } = useNetworkStatus();

  return (
    <ThemeProvider theme={theme}>
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


              <Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route exact path="/disclaimer" element={<Disclaimer />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </>
        ) : (
          <Offlinepage />
        )}
      </div>
      {/* <StickyFooter /> */}
      <BottomNav />
    </ThemeProvider>
  );
}

export default App;
