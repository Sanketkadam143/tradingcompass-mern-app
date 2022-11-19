import { React, useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import { Paper, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PopupOrder from "./PopupOrder";
import { useStateContext } from "../../Contexts/ContextProvider";
import Showorders from "./Showorders";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Calculateprofit from "./Calculateprofit";
import BuyStocks from "./BuyStocks";
import { Tabs, Tab } from "@tarragon/swipeable-tabs";
import { getOrders } from "../../actions/order";

const useStyles = makeStyles((theme) => {
  return {
    mainDiv:{
     marginTop:"-2em",
    },
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
  const dispatch = useDispatch();
  const { user } = useStateContext();
  const [selectedTab, setSelectedTab] = useState("POSITION");
  const changeTab = (e) => {
    setSelectedTab(e.label);
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
  const isExpiry = expiryDate?.slice(0, 2) === new Date().toJSON().slice(8, 10);

  const stockBook = orderBook.filter(
    (x) => x?.symbol !== "NIFTY" && x?.symbol !== "BANKNIFTY"
  );

  const optionBook = orderBook.filter(
    (x) => x?.symbol === "NIFTY" || x?.symbol === "BANKNIFTY"
  );

  useEffect(() => {
    user && dispatch(getOrders());
    // eslint-disable-next-line 
  }, []);

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
            </div>
            <Paper className={classes.positionDiv} elevation={3}>
              {stockBook.map((x, index) => (
                <Showorders orderDetails={x} index={index} type="stocks" />
              ))}
            </Paper>
          </div>
        </Tab>
        <Tab label="POSITION" key={1}>
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
              {
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
              }
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
        </Tab>
      </Tabs>
    </div>
  );
};

export default Position;
