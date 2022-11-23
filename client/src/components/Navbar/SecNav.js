import React from "react";
import { AppBar, Typography, Tabs, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStateContext } from "../../Contexts/ContextProvider";
import Marquee from "react-fast-marquee";

// Custom CSS

const useStyles = makeStyles(() => {
  return {
    buttonContainer: {
      display: "flex",
      gap: "3em",
      justifyContent: "space-between",
      width: "100%",
      padding: "0 3em",
    },
    pChange: {
      fontSize: "0.8em",
    },
  };
});

const SecNav = () => {
  //imported price
  const { LivePrice } = useStateContext();

  const classes = useStyles();

  //created array object of elements to display
  const indices = [
    {
      indexname: "Nifty50",
      id: 0,
    },
    {
      indexname: "Nifty Bank",
      id: 18,
    },
    {
      indexname: "IT",
      id: 23,
    },
    {
      indexname: "Metal",
      id: 25,
    },
    {
      indexname: "Auto",
      id: 19,
    },
    {
      indexname: "FMCG",
      id: 22,
    },
    {
      indexname: "Energy",
      id: 53,
    },
  ];

  //mapping all the elements and taking data from api array on basis of id. id is their index position in api
  //tabs are used to make scrollable effect

  return (
    <>
      <AppBar
        sx={{
          py: 0.5,
          px: 0,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        color="secondary"
        style={{ zIndex: 1249, marginTop: "3.8em" ,backgroundColor:"#ffffff",boxShadow:"none"}}
      >
        <Tabs
          value={false}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Marquee gradient={false} pauseOnHover speed={40}>
            <div className={classes.buttonContainer}>
              {indices.map((index) => (
                <div key={index.id}>
                  <Typography variant="subtitle2" color={"black"}>
                    {index?.indexname}
                  </Typography>

                  <Typography color={"black"}>
                    {LivePrice[0]?.data[0][index.id]?.last}&nbsp;
                    <span
                      className={classes.pChange}
                      style={{
                        color:
                          LivePrice[0]?.data[0][index.id]?.percentChange < 0
                            ? "#a84032"
                            : "#32a852",
                      }}
                    >
                      {LivePrice[0]?.data[0][index.id]?.percentChange}%
                    </span>
                  </Typography>
                </div>
              ))}
            </div>
          </Marquee>
        </Tabs>
        <Divider/>
      </AppBar>
     
    </>
  );
};

export default SecNav;
