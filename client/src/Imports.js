import React, { useEffect, lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Navbar from "./components/Navbar/Navbar";
import SecNav from "./components/Navbar/SecNav";
import BottomNav from "./components/Navbar/BottomNav";
import { useStateContext } from "./Contexts/ContextProvider";
import useNetworkStatus from "./Contexts/Networkstatus";
import Offlinepage from "./Pages/Offlinepage";
import { CLIENT_MSG } from "./constants/actionTypes";
import CircularProgress from "@mui/material/CircularProgress";
import useSocketConnection from "./API/socket";

const Selecttime = lazy(() => import("./components/TimeperiodOI/Selecttime"));
const Auth = lazy(() => import("./components/Auth/Auth"));
const IndexOI = lazy(() => import("./Pages/IndexOI"));
const SectorialFlow = lazy(() => import("./Pages/SectorialFlow"));
const Position = lazy(() => import("./components/Portfolio/Position"));
const CallvsPutpage = lazy(() => import("./Pages/CallvsPutpage"));
const ResetPass = lazy(() => import("./components/Auth/ResetPass"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./Pages/Disclaimer"));
const About = lazy(() => import("./Pages/About"));

const Imports = () => {
  const dispatch = useDispatch();
  const { user } = useStateContext();
  const { isOnline } = useNetworkStatus();
  const socket = useSocketConnection();
  const message = useSelector((state) => state.auth.message?.info);
  const status = useSelector((state) => state.auth.message?.status);
  const { enqueueSnackbar } = useSnackbar();
  const [offlineCheck, setofflineCheck] = useState(false);

  useEffect(() => {
    (status === 404 || status === 400 || status === 500) &&
      enqueueSnackbar(message, { variant: "error" });

    status === 200 && enqueueSnackbar(message, { variant: "success" });

    status === 0 && enqueueSnackbar("Network Error", { variant: "error" });

    !isOnline && enqueueSnackbar("You are Offline", { variant: "error" });

    !isOnline && setofflineCheck(true);
    if (offlineCheck && isOnline) {
      enqueueSnackbar("Back Online", { variant: "success" });
      setofflineCheck(false);
    }

    dispatch({ type: CLIENT_MSG, message: { info: null, status: null } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, isOnline, socket]);

  return (
    <>
      <Navbar />
      <SecNav />

      <div className="App" style={{ marginTop: "10em" }}>
        {isOnline ? (
          <>
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress size={60} />
                </div>
              }
            >
              <Routes>
                <Route
                  exact
                  path="/"
                  element={user ? <Selecttime /> : <Auth />}
                />
                <Route exact path="/auth" element={<Auth />} />
                <Route
                  path="/indexOI"
                  element={user ? <IndexOI /> : <Auth />}
                />
                <Route
                  path="/sectorialflow"
                  element={user ? <SectorialFlow /> : <Auth />}
                />
                <Route
                  path="/portfolio"
                  element={user ? <Position /> : <Auth />}
                />

                <Route
                  exact
                  path="/oi-intervalwise"
                  element={user ? <SectorialFlow /> : <Auth />}
                />
                <Route
                  exact
                  path="/callvsput"
                  element={user ? <CallvsPutpage /> : <Auth />}
                />

                <Route exact path="/forget-password" element={<ResetPass />} />
                <Route
                  exact
                  path="/privacypolicy"
                  element={<PrivacyPolicy />}
                />
                <Route exact path="/disclaimer" element={<Disclaimer />} />
                <Route exact path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </>
        ) : (
          <Offlinepage />
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default Imports;
