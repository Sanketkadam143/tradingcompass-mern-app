import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../components/Charts/Table/Table";
import { getRegistration } from "../actions/contest";
import  Leader from "../components/Leaderboard/Leaderboard";
import Navbar from "../components/Navbar/Navbar";


const useStyles = makeStyles({
  btn_styles: {
    marginLeft: 10,
    display: "flex",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  outerDiv: {
    backgroundColor: "#f0f0f0",
    marginTop: "60px",
  },
});

const Leaderboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getRegistration());

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes.outerDiv}>
        <Leader />
        <div style={{ margin: "1em" }}>
          <CustomTable />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
