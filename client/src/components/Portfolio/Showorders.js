import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateContext } from "../../Contexts/ContextProvider";
import { updateOrder, deleteOrder } from "../../actions/order";
import Calculateprofit from "./Calculateprofit";

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
      top: "0px",
      right: "0px",
    },
  };
});

const Showorders = ({ orderDetails, index }) => {
  const dispatch = useDispatch();
  const { LivePrice, niftyDaydata, niftyTimestamp, bankTimestamp } =
    useStateContext();
  const classes = useStyles();

  let { latestPrice, profit } = Calculateprofit(orderDetails);

  const [anchorEl, setAnchorEl] = useState(false);

  const [confirm, setConfirm] = useState(null);

  const [autoSquareoff, setAutoSquareoff] = useState(false);

  const [isSold, setIsSold] = useState();

  useEffect(() => {
    setIsSold(orderDetails.sellPrice !== undefined);
  }, [orderDetails]);

  const [exitDetails, setExitDetails] = useState({
    sellPrice: "",
    profit: "",
    exitTime: "",
  });

  const currentId = orderDetails._id;

  const confirmExit = (e) => {
    setConfirm(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
    setConfirm(null);
  };

  orderDetails.orderType === "optionSelling" && (profit = -profit);

  const brokerage = parseInt(orderDetails.lots) * 50;

  useEffect(() => {
    setExitDetails({
      sellPrice: latestPrice,
      profit: profit,
      exitTime:
        orderDetails.indexName === "NIFTY" ? niftyTimestamp : bankTimestamp,
    });
  }, [
    orderDetails,
    latestPrice,
    profit,
    brokerage,
    bankTimestamp,
    niftyTimestamp,
  ]);

  const exitPosition = (event) => {
    dispatch(updateOrder(currentId, exitDetails));
    setAnchorEl(true);
    setConfirm(null);
    setIsSold(true);
  };

  const autoexit = (event) => {
    dispatch(updateOrder(currentId, exitDetails));
    setAutoSquareoff(true);
    setAnchorEl(true);
    setConfirm(null);
  };

  const removeOrder = (event) => {
    dispatch(deleteOrder(currentId));
    setIsSold(false);
  };

  const autoExittime = "15:30:00";
  const resTime = LivePrice[0]?._id?.slice(12);
  const isExpiry =
    niftyDaydata[0]?.expiryDate?.slice(0, 2) ===
    new Date().toJSON().slice(8, 10);

  resTime === autoExittime && !isSold && isExpiry && autoexit();

  const orderName =
    orderDetails.indexName +
    " " +
    orderDetails.stp +
    " " +
    orderDetails.optionType +
    " " +
    (orderDetails.orderType === "optionBuying"
      ? "Option Buying"
      : "Option Selling");

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
            {orderDetails.orderType === "optionBuying"
              ? "Buy Price"
              : "Sell Price"}{" "}
            {orderDetails.buyPrice}
          </div>

          <div>
            Quantity {orderDetails.lots}
            {orderDetails.indexName === "NIFTY" ? " X 50" : " X 25"}{" "}
          </div>
        </div>
        <div className={classes.exitDiv}>
          {isSold && <div> Exit Time {orderDetails?.exitTime}</div>}

          {isSold && (
            <div>
              {" "}
              {orderDetails.orderType === "optionBuying"
                ? "Sell Price"
                : "Buy Price"}{" "}
              {orderDetails.sellPrice}
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
              {!isSold ? profit : profit}{" "}
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
          disabled={isSold}
        >
          {isSold ? "Closed" : "Exit"}
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

        <Dialog
          open={anchorEl}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            handleClose();
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <Alert
            onClose={() => {
              handleClose();
            }}
            severity="success"
          >
            <AlertTitle>
              <strong>
                {" "}
                {autoSquareoff
                  ? `Your Position ${orderName} has been Auto Squared off as today was expiry`
                  : `Your Position ${orderName} was Successfully Exited !!!`}
              </strong>
            </AlertTitle>
            This is a virtual option trading platform. Money will neither be
            debited nor credited in your Bank Account
          </Alert>
        </Dialog>
      </div>

      <Divider style={{ width: "100%" }} />
    </div>
  );
};

export default Showorders;
