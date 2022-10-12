import React from "react";
import { Paper, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PopupOrder from "./PopupOrder";
import { useStateContext } from "../../Contexts/ContextProvider";
import Showorders from "./Showorders";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const useStyles = makeStyles((theme) => {
  return {
    positionPageDiv: {
      margin: "1em",
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    investedDiv: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      marginTop: "1em",
    },
    orderDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },

    pnlDiv: {
      width: "100%",
      marginBottom: "1em",
      fontSize: "20px",
      fontFamily: "Arial",
      display: "flex",
      justifyContent: "space-around",
    },

    paperDiv: {
      margin: "1em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      // maxWidth: "50%",
    },
    positionDiv: {
      minWidth: "80%",
    },
  };
});

const Position = () => {
  const classes = useStyles();
  const { NiftyData, BankData, orderBook } = useStateContext();

  let totalProfit = 0;
  orderBook?.forEach((x) => {
    totalProfit += parseInt(x.profit);
  });

  let invested = 0,
    investedProfit = 0;
  orderBook?.forEach((x) => {
    x.exitPrice === undefined && (invested += parseInt(x.margin));
    x.exitPrice === undefined && (investedProfit += parseInt(x.profit));
  });
  const isExpiry =   NiftyData[0]?.expiryDate?.slice(0, 2) === new Date().toJSON().slice(8, 10);

  return (
    <>
      <div className={classes.positionPageDiv}>
        <div className={classes.orderDiv}>
          <Paper className={classes.paperDiv} elevation={3}>
            <div className={classes.investedDiv}>
              <div>
                <div>Invested</div>
                <div>
                  <Typography variant="h5">{invested}</Typography>
                </div>
              </div>
              <div>
                <div>Current</div>
                <div
                  style={{
                    color:
                      invested + investedProfit < invested
                        ? "#a84032"
                        : "#32a852",
                  }}
                >
                  <Typography variant="h5">
                    {invested + investedProfit}
                  </Typography>

                  <Typography variant="subtitle2">
                    {invested === 0
                      ? "0"
                      : ((investedProfit / invested) * 100).toFixed(2)}{" "}
                    %
                  </Typography>
                </div>
              </div>
            </div>
            <Divider style={{ width: "90%", margin: "1em" }} />
            <div className={classes.pnlDiv}>
              <span>Total P&L </span>
              <span
                style={{
                  color: totalProfit < 0 ? "#a84032" : "#32a852",
                }}
              >
                {totalProfit > 0 && "+"}
                {totalProfit}
              </span>
            </div>
          </Paper>

          <Paper className={classes.paperDiv} elevation={3}>
            <PopupOrder
              name="Buy Options"
              niftyData={NiftyData}
              bankData={BankData}
              orderType="optionBuying"
            />
            <PopupOrder
              name="Sell Options"
              niftyData={NiftyData}
              bankData={BankData}
              orderType="optionSelling"
            />
          </Paper>
        </div>

        <Paper className={classes.positionDiv} elevation={3}>
          {isExpiry && (
            <Alert severity="warning">
              <AlertTitle> Today {NiftyData[0]?.expiryDate} is expiry</AlertTitle>

              <strong>Your Position will be autosquared off at 3:30 pm</strong>
            </Alert>
          )}
          {orderBook.map((x, index) => (
            <Showorders orderDetails={x} index={index} />
          ))}
        </Paper>
      </div>
    </>
  );
};

export default Position;
