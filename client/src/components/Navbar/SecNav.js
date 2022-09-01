import React from "react";
import { AppBar, Typography, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStateContext } from "../../Contexts/ContextProvider";

// Custom CSS

const useStyles = makeStyles(() => {
  return {
    buttonContainer: {
      display: "flex",
      gap: "3em",
      justifyContent: "space-between",
      width: "100%",
      padding: "0 2em",
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
          py: 1,
          px: 0,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        color="secondary"
        style={{ zIndex: 1249, marginTop: "4.5em" }}
      >
        <Tabs
          value={false}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <div className={classes.buttonContainer}>
            {indices.map((index) => (
              <div key={index.id}>
                <Typography variant="subtitle2">{index?.indexname}</Typography>

                <Typography>
                  {LivePrice?.data[index.id]?.last}&nbsp;
                  <span
                    className={classes.pChange}
                    style={{
                      color:
                        LivePrice?.data[index.id]?.percentChange < 0
                          ? "#a84032"
                          : "#32a852",
                    }}
                  >
                    {LivePrice?.data[index.id]?.percentChange}%
                  </span>
                </Typography>
              </div>
            ))}
          </div>
        </Tabs>
      </AppBar>
    </>
  );
};

export default SecNav;
