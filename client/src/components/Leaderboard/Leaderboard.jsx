import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Cards from "./allCards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { getRegistration, registration } from "../../actions/contest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  btn_styles: {
    marginLeft: 10,
    marginTop: 10,
    display: "flex",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    paddingTop: "20px",
  },
});

const Leaderboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isregister = useSelector((state) => state.auth.isregister);
  const [confirm, setConfirm] = useState(null);
  const [isclick, setIsclick] = useState(false);

  const handleClose = () => {
    setConfirm(null);
    setIsclick(false);
  };

  const confirmExit = (e) => {
    setConfirm(e.currentTarget);
    setIsclick(true);
  };
  useEffect(() => {
    dispatch(getRegistration());

    // eslint-disable-next-line
  }, []);

  // const cardSx = {
  //   "&:hover": {
  //     marginTop: -2,
  //   },
  // };

  return (
    <>
      <Container align="center">
        <Typography
          variant="h4"
          align="center"
          fontFamily="revert-layer"
          color="black"
          className={classes.heading}
          gutterBottom
        >
          Leaderboard
        </Typography>
        {/* ------------------------card component --------------------------------- */}

        <Cards />

        {/* ------------------------card component --------------------------------- */}

        <Grid className={classes.btn_styles}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disabled={isregister === null || isclick}
            onClick={confirmExit}
          >
            {!isclick && (isregister ? "unregister" : "register")}
            {isclick && <CircularProgress size={24} />}
          </Button>
          <Button variant="outlined" startIcon={<ArrowUpwardIcon />}>
            Top Winners
          </Button>
        </Grid>
      </Container>
      <div>
        <Dialog
          open={confirm}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            handleClose();
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <Alert
            action={
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(registration());
                    handleClose();
                  }}
                >
                  {isregister ? "unregister" : "register"}
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </>
            }
            severity="warning"
          >
            <AlertTitle>
              <strong>
                {`Are you sure you want ${
                  isregister ? "unregister" : "register"
                }
                ?`}
              </strong>
            </AlertTitle>
            {!isregister &&
              "Your Order Details will be visible in Public Leaderboard"}
          </Alert>
        </Dialog>
      </div>
      <Container></Container>
    </>
  );
};

export default Leaderboard;
