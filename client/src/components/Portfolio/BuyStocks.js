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

export default function BuyStocks({ name, stockData, orderType }) {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message?.info);
  const classes = useStyles();
  const { marketStatus, stockTimestamp } = useStateContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedStock, setSelectedStock] = useState();
  const [quantity, setQuantity] = useState(0);
  const [isclick, setIsclick] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    symbol: "",
    buyPrice: "",
    lots: "",
    entryTime: "",
    orderType: "",
    margin: "",
  });

  const filterData = stockData.slice(1);
  const data =filterData?.sort((a, b) => a.symbol.localeCompare(b.symbol));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setQuantity(0);
  };

  const handleChange2 = (event) => {
    setSelectedStock(event.target.value);
  };

  const enableButton = (event) => {
    setQuantity(event.target.value);
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
  const currentPrice =
    data[data?.findIndex((element) => element?.symbol === selectedStock)]?.last;

  const requiredMargin = quantity > 0 ? (currentPrice * quantity).toFixed(2) : 0;

  useEffect(() => {
    setOrderDetails({
      symbol: selectedStock,
      buyPrice: currentPrice,
      lots: quantity,
      entryTime: stockTimestamp,
      orderType: orderType,
      margin: requiredMargin,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredMargin, currentPrice, quantity]);

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
            <InputLabel id="stocks">Stocks</InputLabel>
            <Select
              labelId="stocks"
              id="stock"
              value={selectedStock}
              label="Select Stock"
              onChange={handleChange2}
              MenuProps={{
                style: {
                  maxHeight: 190,
                },
              }}
            >
              {data?.map((x) => (
                <MenuItem key={x?.symbol} value={x?.symbol}>
                  {x?.symbol}
                </MenuItem>
              ))}
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
              label={"Quantity"}
              type="number"
              placeholder="No of Shares"
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
            disabled={quantity <= 0 || isclick}
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
