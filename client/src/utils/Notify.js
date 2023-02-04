import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useNetworkStatus from "../Contexts/Networkstatus";
import { CLIENT_MSG } from "../constants/actionTypes";

const Notify = () => {
  const dispatch = useDispatch();
  const { isOnline } = useNetworkStatus();
  const message = useSelector((state) => state.auth.message?.info);
  const status = useSelector((state) => state.auth.message?.status);
  const [offlineCheck, setofflineCheck] = useState(false);

  useEffect(() => {
    (status === 404 || status === 400 || status === 500) &&
      toast.error(message);

    status === 200 && toast.success(message);

    status === 0 && toast.error("Network Error");

    !isOnline && toast.error("You are Offline");

    !isOnline && setofflineCheck(true);
    if (offlineCheck && isOnline) {
      toast.success("Back Online");

      setofflineCheck(false);
    }

    dispatch({ type: CLIENT_MSG, message: { info: null, status: null } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, isOnline]);

  return <ToastContainer />;
};

export default Notify;
