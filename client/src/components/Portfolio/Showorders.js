import React, { useState } from "react";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useStateContext } from "../../Contexts/ContextProvider";

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
  };
});

const Showorders = ({ orderDetails, index }) => {
  const { NiftyData, BankData, orderBook, LivePrice } = useStateContext();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(false);

  const [confirm, setConfirm] = useState(null);

  const [autoSquareoff, setAutoSquareoff] = useState(false);

  const confirmExit = (e) => {
    setConfirm(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
    setConfirm(null);
  };

  let latestPrice =
    orderDetails.indexName === "NIFTY"
      ? orderDetails.optionType === "CE"
        ? NiftyData[
            NiftyData?.findIndex(
              (element) => element?.strikePrice === orderDetails.strikePrice
            )
          ]?.CE?.lastPrice
        : NiftyData[
            NiftyData?.findIndex(
              (element) => element?.strikePrice === orderDetails.strikePrice
            )
          ]?.PE?.lastPrice
      : orderDetails.optionType === "CE"
      ? BankData[
          BankData?.findIndex(
            (element) => element?.strikePrice === orderDetails.strikePrice
          )
        ]?.CE?.lastPrice
      : BankData[
          BankData?.findIndex(
            (element) => element?.strikePrice === orderDetails.strikePrice
          )
        ]?.PE?.lastPrice;

  let profit =
    orderDetails.exitPrice !== undefined
      ? (
          (orderDetails.exitPrice - orderDetails.price) *
          (orderDetails.indexName === "NIFTY" ? 50 : 25) *
          orderDetails.lots
        ).toFixed(2)
      : (
          (latestPrice - orderDetails.price) *
          (orderDetails.indexName === "NIFTY" ? 50 : 25) *
          orderDetails.lots
        ).toFixed(2);

  orderDetails.orderType === "optionSelling" && (profit = -profit);

  orderDetails.exitPrice === undefined && (orderBook[index].profit = profit);
  localStorage.setItem("orderBook", JSON.stringify(orderBook));

  const brokerage = parseInt(orderDetails.lots) * 50;

  const exitPosition = (event) => {
    setAnchorEl(true);
    setConfirm(null);

    orderBook[index].exitPrice = latestPrice;
    orderBook[index].profit = profit - brokerage;
    orderBook[index].exitTime =
      orderDetails.indexName === "NIFTY"
        ? NiftyData[0]?.timestamp
        : BankData[0]?.timestamp;
    localStorage.setItem("orderBook", JSON.stringify(orderBook));
  };

  const autoexit = (event) => {
    setAutoSquareoff(true);
    setAnchorEl(true);
    setConfirm(null);

    orderBook[index].exitPrice = latestPrice;
    orderBook[index].profit = profit - brokerage;
    orderBook[index].exitTime =
      orderDetails.indexName === "NIFTY"
        ? NiftyData[0]?.timestamp
        : BankData[0]?.timestamp;
    localStorage.setItem("orderBook", JSON.stringify(orderBook));
  };

  const autoExittime = "15:30:00";
  const resTime = LivePrice[0]?._id?.slice(12);
  const isExpiry =
    NiftyData[0]?.expiryDate?.slice(0, 2) === new Date().toJSON().slice(8, 10);

  resTime === autoExittime &&
    orderDetails.exitPrice === undefined &&
    isExpiry &&
    autoexit();

  const orderName =
    orderDetails.indexName +
    " " +
    orderDetails.strikePrice +
    " " +
    orderDetails.optionType +
    " " +
    (orderDetails.orderType === "optionBuying"
      ? "Option Buying"
      : "Option Selling");

  return (
    <div className={classes.paperDiv}>
      <div className={classes.orderDiv}>{orderName}</div>
      <div className={classes.statusDiv}>
        <div className={classes.entryDiv}>
          <div>Entry Time {orderDetails.orderTime}</div>

          <div>
            {orderDetails.orderType === "optionBuying"
              ? "Buy Price"
              : "Sell Price"}{" "}
            {orderDetails.price}
          </div>

          <div>
            Quantity {orderDetails.lots}
            {orderDetails.indexName === "NIFTY" ? " X 50" : " X 25"}{" "}
          </div>
        </div>
        <div className={classes.exitDiv}>
          {orderDetails.exitPrice !== undefined && (
            <div> Exit Time {orderDetails?.exitTime}</div>
          )}

          {orderDetails.exitPrice !== undefined && (
            <div>
              {" "}
              {orderDetails.orderType === "optionBuying"
                ? "Sell Price"
                : "Buy Price"}{" "}
              {orderDetails.exitPrice}
            </div>
          )}

          <div>Current Price {latestPrice}</div>
          <div>
            P&L{" "}
            <span
              style={{
                color: profit < 0 ? "#a84032" : "#32a852",
              }}
            >
              {profit > 0 && "+"}
              {orderDetails.exitPrice === undefined
                ? profit
                : profit - brokerage}{" "}
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
          disabled={orderDetails.exitPrice !== undefined}
        >
          {orderDetails.exitPrice !== undefined ? "Closed" : "Exit"}
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
          <DialogTitle>
            Are you sure you want to exit the Position ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Brokerage of ₹ {brokerage} will be debited from your P&L
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                exitPosition();
              }}
            >
              Exit Position
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={anchorEl}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            handleClose();
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {autoSquareoff
              ? `Your Position ${orderName} has been Auto Squared off as today was expiry`
              : `Your Position ${orderName} was Successfully Exited !!!`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a virtual option trading platform. Money will neither be
              debited nor credited in your Bank Account"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Divider style={{ width: "100%" }} />
    </div>
  );
};

export default Showorders;
