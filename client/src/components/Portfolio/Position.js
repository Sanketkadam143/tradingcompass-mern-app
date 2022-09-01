import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PopupOrder from "./PopupOrder";
import { useStateContext } from "../../Contexts/ContextProvider";
import Showorders from "./Showorders";

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
    orderDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent:"space-evenly"
    },

    pnlDiv: {
      margin: "1em",
      fontSize: "23px",
      fontFamily: "Arial",
    },
    
    paperDiv: {
      margin: "1em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
       maxWidth: "50%",
   
    },
    positionDiv:{
        minWidth:"80%"
    }
  };
});

const Position = () => {
  const classes = useStyles();
  const { NiftyData, BankData, orderBook } = useStateContext();

  let totalProfit = 0;
  orderBook?.forEach((x) => {
    totalProfit += parseInt(x.profit);
  });

  return (
    <>
      <div className={classes.positionPageDiv}>
        <div className={classes.orderDiv}>
          <Paper className={classes.paperDiv} elevation={3}>
            <div className={classes.pnlDiv}>Total P&L : {totalProfit}</div>
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

       
          <Paper className={classes.positionDiv}   elevation={3}>
            {orderBook.map((x, index) => (
              <Showorders orderDetails={x} index={index} />
            ))}
          </Paper>
       
      </div>
    </>
  );
};

export default Position;
