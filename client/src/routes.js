import { useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import useNetworkStatus from "./Contexts/Networkstatus";
import { useStateContext } from "./Contexts/ContextProvider";
import pages from "./pages";
import SimpleLayout from "./layouts/SimpleLayout";

const {
  Page404,
  OIcomparison,
  Auth,
  IndexOI,
  SectorialFlow,
  Portfolio,
  CallvsPutpage,
  ResetPass,
  PrivacyPolicy,
  Disclaimer,
  About,
  Offlinepage,
} = pages;

export default function Router() {
  const { isOnline } = useNetworkStatus();
  const [routes, setRoutes] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    user &&
      setRoutes([
        {
          path: "/",
          element: <SimpleLayout Component={OIcomparison} />,
        },
        {
          path: "/auth",
          element: <SimpleLayout Component={Auth} />,
        },
        {
          path: "/indexOI",
          element: <SimpleLayout Component={IndexOI} />,
        },
        {
          path: "/sectorialflow",
          element: <SimpleLayout Component={SectorialFlow} />,
        },
        {
          path: "/portfolio",
          element: isOnline ? (
            <SimpleLayout Component={Portfolio} />
          ) : (
            <SimpleLayout Component={Offlinepage} />
          ),
        },
        {
          path: "/oi-intervalwise",
          element: <SimpleLayout Component={SectorialFlow} />,
        },
        {
          path: "/callvsput",
          element: <SimpleLayout Component={CallvsPutpage} />,
        },
        {
          path: "/forget-password",
          element: <SimpleLayout Component={ResetPass} />,
        },
        {
          path: "/privacypolicy",
          element: <SimpleLayout Component={PrivacyPolicy} />,
        },
        {
          path: "/disclaimer",
          element: <SimpleLayout Component={Disclaimer} />,
        },
        {
          path: "/about",
          element: <SimpleLayout Component={About} />,
        },
        {
          path: "/404",
          element: <Page404 />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ]);

    !user &&
      setRoutes([
        {
          path: "*",
          element: <SimpleLayout Component={Auth} />,
        },
        {
          path: "/forget-password",
          element: <SimpleLayout Component={ResetPass} />,
        },
        {
          path: "/privacypolicy",
          element: <SimpleLayout Component={PrivacyPolicy} />,
        },
        {
          path: "/disclaimer",
          element: <SimpleLayout Component={Disclaimer} />,
        },
        {
          path: "/about",
          element: <SimpleLayout Component={About} />,
        },
      ]);
  }, [isOnline, user]);

  return useRoutes(routes);
}
