import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { useStateContext } from "../../Contexts/ContextProvider";
import { updateOrder, deleteOrder } from "../../actions/order";
import Calculateprofit from "./Calculateprofit";
import { CLIENT_MSG } from "../../constants/actionTypes";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => {
  return {
    paperDiv: {
      margin: "2em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      position: "relative",
    },

    orderDiv: {
      marginBottom: "1em",
      padding: "0.9em",
      border: "1px solid #e0e0e0",
      borderRadius: theme.shape.borderRadius,
    },

    statusDiv: {
      display: "flex",
      justifyContent: "space-between",
      gap: "2em",
    },
    exitDiv: {
      textAlign: "right",
    },
    deleteIcon: {
      position: "absolute",
      top: "0%",
      right: "10%",
      [theme.breakpoints.down("sm")]: {
        top: "-1.7em",
        right: "-2em",
      },
    },
  };
});

const Showorders = ({ orderDetails, index, type }) => {
  const dispatch = useDispatch();
  const {
    niftyDaydata,
    niftyTimestamp,
    bankTimestamp,
    marketStatus,
    stockTimestamp,
  } = useStateContext();
  const classes = useStyles();
  const message = useSelector((state) => state.auth.message?.info);

  let { latestPrice, profit } = Calculateprofit(orderDetails);

  const [confirm, setConfirm] = useState(null);
  const [isclick, setIsclick] = useState(false);
  const [isSold, setIsSold] = useState(orderDetails.sellPrice !== undefined);

  useEffect(() => {
    setIsSold(orderDetails.sellPrice !== undefined);
  }, [orderDetails]);

  const [exitDetails, setExitDetails] = useState({
    sellPrice: "",
    profit: "",
    exitTime: "",
  });

  useEffect(() => {
    setIsclick(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const currentId = orderDetails._id;

  const confirmExit = (e) => {
    if (marketStatus.marketStatus === "Open") {
      setConfirm(e.currentTarget);
      setIsclick(true);
    } else {
      dispatch({
        type: CLIENT_MSG,
        message: {
          info: `Market is closed as of ${marketStatus.tradeDate}`,
          status: 400,
        },
      });
    }
  };

  const handleClose = () => {
    setConfirm(null);
    setIsclick(false);
  };

  const brokerage =
    parseInt(orderDetails.lots) *
    (orderDetails.orderType === "stockBuying" ? 5 : 50);

  useEffect(() => {
    setExitDetails({
      sellPrice: latestPrice,
      profit: profit,
      exitTime:
        orderDetails.orderType === "stockBuying"
          ? stockTimestamp
          : orderDetails.symbol === "NIFTY"
          ? niftyTimestamp
          : bankTimestamp,
    });
  }, [
    orderDetails,
    latestPrice,
    profit,
    brokerage,
    bankTimestamp,
    niftyTimestamp,
    stockTimestamp,
  ]);

  const exitPosition = (event) => {
    dispatch(updateOrder(currentId, exitDetails));
    setConfirm(null);
  };

  const autoexit = (event) => {
    dispatch(updateOrder(currentId, exitDetails));
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: "Your Positions had been Auto-Squared off",
        status: 200,
      },
    });
    setIsSold(true);
  };

  const removeOrder = (event) => {
    dispatch(deleteOrder(currentId));
  };

  const autoExittime = "15:30:00";
  const resTime = niftyTimestamp?.slice(12);
  const isExpiry =
    niftyDaydata[0]?.expiryDate?.slice(0, 2) ===
    niftyDaydata[0]?._id?.slice(8, 10);

  useEffect(() => {
    resTime === autoExittime &&
      !isSold &&
      isExpiry &&
      type === "options" &&
      autoexit();

    // eslint-disable-next-line
  }, []);

  var orderName =
    type === "options"
      ? orderDetails.symbol +
        " " +
        orderDetails?.stp +
        " " +
        orderDetails?.optionType +
        " " +
        (orderDetails.orderType === "optionBuying"
          ? "Option Buying"
          : "Option Selling")
      : orderDetails.symbol;

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className={classes.paperDiv}>
      {isSold && (
        <span className={classes.deleteIcon}>
          <Button
            onClick={() => {
              removeOrder();
            }}
          >
            <DeleteIcon />
          </Button>
        </span>
      )}
      <div className={classes.orderDiv}>{orderName}</div>
      <div className={classes.statusDiv}>
        <div className={classes.entryDiv}>
          <div>Entry Time {orderDetails.entryTime}</div>

          <div>
            {orderDetails.orderType === "optionSelling"
              ? "Sell Price"
              : "Buy Price"}{" "}
            {formatNumber(orderDetails.buyPrice)}
          </div>

          <div>
            Quantity {orderDetails.lots}
            {type === "options" &&
              (orderDetails.symbol === "NIFTY" ? " X 50" : " X 25")}{" "}
          </div>
        </div>
        <div className={classes.exitDiv}>
          {isSold && <div> Exit Time {orderDetails?.exitTime}</div>}

          {isSold && (
            <div>
              {" "}
              {orderDetails.orderType === "optionSelling"
                ? "Buy Price"
                : "Sell Price"}{" "}
              {orderDetails.sellPrice}
            </div>
          )}

          <div>Current Price {formatNumber(latestPrice)}</div>
          <div>
            P&L{" "}
            <span
              style={{
                color: profit < 0 ? "#a84032" : "#32a852",
              }}
            >
              {profit > 0 && "+"}
              {formatNumber(profit)}{" "}
              {((profit / orderDetails.margin) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: "1em" }}
          disableElevation
          onClick={confirmExit}
          disabled={isSold || isclick}
        >
          {!isclick && (isSold ? "Closed" : "Exit")}
          {isclick && <CircularProgress size={24} />}
        </Button>

        <Dialog
          open={confirm}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            handleClose();
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <Alert
            action={
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    exitPosition();
                  }}
                >
                  Exit
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </>
            }
            severity="warning"
          >
            <AlertTitle>
              <strong>Are you sure you want to exit the Position ?</strong>
            </AlertTitle>
            Brokerage of ₹ {brokerage} will be debited from your P&L
          </Alert>
        </Dialog>
      </div>

      <Divider style={{ width: "100%" }} />
    </div>
  );
};

export default Showorders;
