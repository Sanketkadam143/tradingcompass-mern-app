import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTable from "../components/Charts/Table/Table";
import { getRegistration, registration } from "../actions/contest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  btn_styles: {
    marginLeft: 10,
    display: "flex",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Leaderboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
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

  return (
    <>
      <Container align="center">
        <Typography
          variant="h4"
          align="center"
          fontFamily="revert-layer"
          color="black
"
          gutterBottom
        >
          Leaderboard
        </Typography>
        <Grid className={classes.btn_styles}>
          <Button
            disabled={isregister === null || isclick}
            variant="contained"
            align="center"
            color="primary"
            onClick={confirmExit}
          >
            {!isclick && (isregister ? "unregister" : "register")}
            {isclick && <CircularProgress size={24} />}
          </Button>
        </Grid>
      </Container>

      <Box>
        <span>Leaderboard is refreshed every 2 min</span>
      </Box>
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
      <div style={{ margin: "2em" }}>
        <CustomTable />
      </div>
    </>
  );
};

export default Leaderboard;
