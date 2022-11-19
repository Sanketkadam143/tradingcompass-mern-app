import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useStateContext } from "../../Contexts/ContextProvider";
import { makeStyles } from "@mui/styles";
import { placeOrder } from "../../actions/order";
import { CLIENT_MSG } from "../../constants/actionTypes";

const useStyles = makeStyles((theme) => {
  return {
    boxDiv: {
      padding: "0.9em",
      border: "1px solid #e0e0e0",
      borderRadius: theme.shape.borderRadius,
    },
  };
});

export default function PopupOrder({ name, niftyData, bankData, orderType }) {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message?.info);
  const classes = useStyles();
  const { marketStatus, niftyTimestamp, bankTimestamp } = useStateContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pos, setPos] = useState(1);
  const [cepePos, setCepePos] = useState(3);
  const [data, setData] = useState(niftyData);
  const [selectedStrike, setSelectedStrike] = useState(niftyData[20]?.stp);
  const [lots, setLots] = useState(0);
  const [isclick, setIsclick] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    symbol: "",
    stp: "",
    optionType: "",
    buyPrice: "",
    lots: "",
    entryTime: "",
    orderType: "",
    margin: "",
  });

  const [isnifty, setIsnifty] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLots(0);
  };

  const handleChange = (event) => {
    setPos(event.target.value);

    isnifty
      ? setSelectedStrike(bankData[20]?.stp)
      : setSelectedStrike(niftyData[20]?.stp);

    isnifty ? setData(bankData) : setData(niftyData);

    setIsnifty(!isnifty);
  };

  const handleChange2 = (event) => {
    setSelectedStrike(event.target.value);
  };

  const handleChange3 = (event) => {
    setCepePos(event.target.value);
  };

  const enableButton = (event) => {
    setLots(event.target.value);
  };

  const order = (event) => {
    if (marketStatus.marketStatus === "Open") {
      setTimeout(() => dispatch(placeOrder(orderDetails)), 500);

      setIsclick(true);
    } else {
      dispatch({
        type: CLIENT_MSG,
        message: {
          info: `Market will open on ${marketStatus.tradeDate} 9:15 AM`,
          status: 400,
        },
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    isnifty ? setData(niftyData) : setData(bankData);
  }, [niftyData, bankData, isnifty]);

  const currentPrice =
    cepePos === 4
      ? data[data?.findIndex((element) => element?.stp === selectedStrike)]?.PE
          ?.LTP
      : data[data?.findIndex((element) => element?.stp === selectedStrike)]?.CE
          ?.LTP;

  const requiredMargin =
    lots > 0
      ? isnifty
        ? (currentPrice * lots * 50).toFixed(2)
        : (currentPrice * lots * 25).toFixed(2)
      : 0;

  useEffect(() => {
    setOrderDetails({
      symbol : isnifty ? "NIFTY" : "BANKNIFTY",
      stp: selectedStrike,
      optionType: cepePos === 3 ? "CE" : "PE",
      buyPrice: currentPrice,
      lots: lots,
      entryTime: isnifty ? niftyTimestamp : bankTimestamp,
      orderType: orderType,
      margin: requiredMargin,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    requiredMargin,
    isnifty,
    selectedStrike,
    cepePos,
    currentPrice,
    lots,
    niftyTimestamp,
    bankTimestamp,
  ]);

  useEffect(() => {
    setIsclick(false);
    setAnchorEl(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      <Button
        aria-describedby={"simple-popover"}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ margin: "1.2em" }}
        disableElevation
        onClick={handleClick}
      >
        {name}
      </Button>
      <Popover
        id={"simple-popover"}
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ marginBottom: "200px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div>
          <FormControl sx={{ m: 1, minWidth: 130 }} style={{ margin: "1em" }}>
            <InputLabel id="index">Select Index</InputLabel>
            <Select
              labelId="index"
              id="selectindex"
              value={pos}
              label="Select Index"
              onChange={handleChange}
            >
              <MenuItem value={1}>NIFTY</MenuItem>
              <MenuItem value={2}>BANKNIFTY</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 130 }} style={{ margin: "1em" }}>
            <InputLabel id="stp">Strike-Price</InputLabel>
            <Select
              labelId="stp"
              id="strike"
              value={selectedStrike}
              label="Select Strike"
              onChange={handleChange2}
              MenuProps={{
                style: {
                   maxHeight: 275,
                      },
                }}
            >
              {data?.map((x) => (
                <MenuItem key={x?.stp} value={x?.stp}>
                  {x?.stp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, minWidth: 130 }} style={{ margin: "1em" }}>
            <InputLabel id="cepe">Select Option</InputLabel>
            <Select
              labelId="cepe"
              id="selectcepe"
              value={cepePos}
              label="Select CE PE"
              onChange={handleChange3}
            >
              <MenuItem value={3} name="CE">
                CE
              </MenuItem>
              <MenuItem value={4} name="PE">
                PE
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 130 }} style={{ margin: "1em" }}>
            <div className={classes.boxDiv}>
              <Typography> &#8377; {currentPrice}</Typography>
            </div>
            <FormHelperText>Current Price</FormHelperText>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, maxWidth: 130 }} style={{ margin: "1em" }}>
            <TextField
              id="outlined-number"
              onChange={enableButton}
              label={isnifty ? " Lots Size 50 " : " Lots Size 25 "}
              type="number"
              placeholder="No of Lots"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 130 }} style={{ margin: "1em" }}>
            <div className={classes.boxDiv}>
              <Typography> &#8377; {requiredMargin} </Typography>
            </div>
            <FormHelperText>Required Margin</FormHelperText>
          </FormControl>
        </div>

        <div style={{ padding: "1em" }}>
          <Button
            aria-describedby={"simple-popover"}
            disabled={lots <= 0 || isclick}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            onClick={order}
          >
            {isclick ? <CircularProgress size={24}/> : "Click to Place Order"}
          </Button>
        </div>
      </Popover>
    </>
  );
}
