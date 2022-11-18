import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";


const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#20b8ba",
    zIndex: 100,
  },
}));

const BottomNav = () => {
  //access funtion usestyle
  const classes = useStyles();

  //usestate to setvalue to indicate navigation tab
  const [value, setValue] = React.useState(null);

  const navigate = useNavigate();

  return (
    <BottomNavigation
      className={classes.root}
      style={{ backgroundColor: "#eeeeee" }}
      showLabels
      value={value}
      
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="Index"
        icon={<CandlestickChartRoundedIcon />}
        onClick={() => navigate("/indexOI")}
      />
      <BottomNavigationAction
        label="Sectors"
        icon={<AccountBalanceRoundedIcon />}
        onClick={() => navigate("/sectorialflow")}
      />
      <BottomNavigationAction
        label="Portfolio"
        icon={<LocalMallRoundedIcon/>}
        onClick={() => navigate("/portfolio")}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
