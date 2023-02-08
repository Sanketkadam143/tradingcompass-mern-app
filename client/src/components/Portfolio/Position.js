import { React, useState, useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Paper, Divider, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PopupOrder from "./PopupOrder";
import { useStateContext } from "../../Contexts/ContextProvider";
import Showorders from "./Showorders";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Calculateprofit from "./Calculateprofit";
import BuyStocks from "./BuyStocks";
import { Tabs, Tab } from "@tarragon/swipeable-tabs";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { getOrders } from "../../actions/order";

const useStyles = makeStyles((theme) => {
  return {
    mainDiv: {
      marginTop: "-2em",
    },
    positionPageDiv: {
      margin: "1em",
      marginTop: "-0.5em",
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
    },
    positionDiv: {
      minWidth: "80%",
    },
    tabDiv: {
      height: "65vh",
      overflow: "auto",
      scrollBehavior: "smooth",
    },
  };
});

const Position = () => {
  const classes = useStyles();
  const ref = useRef();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("POSITIONS");
  const [pos, setPos] = useState(false);
  const [isExpiry, setIsExpiry] = useState(false);

  const changeTab = (e) => {
    setSelectedTab(e.label);
    handleTop();
  };
  const handleTop = () => {
    ref.current.scrollTop = 0;
    setPos(false);
  };

  const handleScroll = () => {
    if (ref.current.scrollTop > 50) {
      if (!pos) setPos(true);
    } else {
      if (pos) setPos(false);
    }
  };

  const { NiftyData, BankData, StockData, niftyDaydata } = useStateContext();
  const orderBook = useSelector((state) => state.order);

  let totalProfit = 0;
  orderBook?.forEach((x) => {
    let { profit } = Calculateprofit(x);
    totalProfit += parseInt(profit);
  });

  let invested = 0;
  let investedProfit = 0;
  orderBook?.forEach((x) => {
    if (x.sellPrice === undefined) {
      invested += parseInt(x.margin);
      let { profit } = Calculateprofit(x);
      investedProfit += parseInt(profit);
    }
  });
  const expiryDate = niftyDaydata[0]?.expiryDate;

  const stockBook = orderBook.filter(
    (x) => x?.symbol !== "NIFTY" && x?.symbol !== "BANKNIFTY"
  );

  const optionBook = orderBook.filter(
    (x) => x?.symbol === "NIFTY" || x?.symbol === "BANKNIFTY"
  );

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


  useEffect(() => {
    dispatch(getOrders());
    setIsExpiry(
      niftyDaydata.length === 0
        ? false
        : niftyDaydata[0]?.expiryDate?.slice(0, 2) ===
            niftyDaydata[0]?._id?.slice(8, 10)
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const temp = ref.current;
    temp.addEventListener("scroll", handleScroll);
    return () => temp.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className={classes.mainDiv}>
      <Tabs
        value={selectedTab}
        onChange={changeTab}
        tabBarCSS={`font-size: 1.2rem;
        font-weight: normal; font-family: NHaasUnicaPro; margin: 0 20px 15px; `}
        styleProps={{
          barColor: "transparent",
          selectedHeaderTextColor: "#081452",
          headerTextColor: "#fffff",
          activeInkBarColor: "#1890ff",
          inkBarColor: "hsla(0,0%,100%,.45)",
          size: "medium",
          tabPosition: "top",
        }}
      >
        <Tab label="HOLDINGS" key={0}>
          <div className={classes.tabDiv} ref={ref}>
            <div className={classes.positionPageDiv}>
              <div className={classes.orderDiv}>
                <Paper className={classes.paperDiv} elevation={3}>
                  <div className={classes.investedDiv}>
                    <div>
                      <div>Invested</div>
                      <div>
                        <Typography variant="h5">
                          {formatNumber(invested)}
                        </Typography>
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
                          {formatNumber(invested + investedProfit)}
                        </Typography>
                        <Typography variant="subtitle2">
                          {invested === 0
                            ? "0"
                            : ((investedProfit / invested) * 100).toFixed(
                                2
                              )}{" "}
                          %
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <div>Available</div>
                      <div>
                        <Typography variant="h5">
                          {formatNumber(100000-invested)}
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
                      {formatNumber(totalProfit)}
                    </span>
                  </div>
                </Paper>
              </div>
              <Paper className={classes.positionDiv} elevation={3}>
                {stockBook.map((x, index) => (
                  <Showorders orderDetails={x} index={index} type="stocks" />
                ))}
              </Paper>
            </div>
          </div>
        </Tab>
        <Tab label="POSITIONS" key={1}>
          <div className={classes.tabDiv} ref={ref}>
            <div className={classes.positionPageDiv}>
              <div className={classes.orderDiv}>
                <Paper className={classes.paperDiv} elevation={3}>
                  <div className={classes.investedDiv}>
                    <div>
                      <div>Invested</div>
                      <div>
                        <Typography variant="h5">
                          {formatNumber(invested)}
                        </Typography>
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
                          {formatNumber(invested + investedProfit)}
                        </Typography>
                        <Typography variant="subtitle2">
                          {invested === 0
                            ? "0"
                            : ((investedProfit / invested) * 100).toFixed(
                                2
                              )}{" "}
                          %
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <div>Available</div>
                      <div>
                        <Typography variant="h5">
                          {formatNumber(100000-invested)}
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
                      {formatNumber(totalProfit)}
                    </span>
                  </div>
                </Paper>

                <Paper className={classes.paperDiv} elevation={3}>
                  <BuyStocks
                    name="Buy Stocks"
                    stockData={StockData}
                    orderType="stockBuying"
                  />
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
                    <AlertTitle> Today {expiryDate} is expiry</AlertTitle>
                    <strong>
                      Your Position will be autosquared off at 3:30 pm
                    </strong>
                  </Alert>
                )}
                {optionBook.map((x, index) => (
                  <Showorders orderDetails={x} index={index} type="options" />
                ))}
              </Paper>
            </div>
          </div>
        </Tab>
      </Tabs>

      <IconButton
        style={{
          position: "fixed",
          bottom: 50,
          right: 30,
          display: pos ? "block" : "none",
          zIndex: 1300,
        }}
        onClick={handleTop}
      >
        <Fab variant="extended">
          <NavigationIcon sx={{ mr: 1 }} />
          Top
        </Fab>
      </IconButton>
    </div>
  );
};

export default Position;
