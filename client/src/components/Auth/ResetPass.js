import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown from "react-countdown";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import Input from "./Input";
import { resetPassword } from "../../actions/auth";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const ResetPass = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isotp, setIsotp] = useState(false);
  const [isotpVerified, setIsotpVerified] = useState(false);
  const [timer, setTimer] = useState();
  const [isclick, setIsclick] = useState(false);
  const message = useSelector((state) => state.auth.message?.info);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsclick(true);
    setTimeout(() =>dispatch(resetPassword(formData, navigate)), 500);
    
   
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const otpSent = () => {
    setIsotp(true);
    setTimer(Date.now() + 120000);
  };

  const otpVerified = () => {
    setIsotpVerified(true);
    setIsotp(false);
    setTimer(null);
  };

  useEffect(() => {
    message === "OTP Sent on registered Email" && otpSent();

    message === "OTP Verified" && otpVerified();

    message === "Password Reset Successfully" && navigate("/auth");

    setIsclick(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsotp(false);
      setFormData({
        ...formData,
        otp: "",
      });
    }
    return (
      <span className={classes.timer}>
        {minutes}:{seconds}
      </span>
    );
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography varient="h5">Reset Password</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                disabled={isotp || isotpVerified}
              />

              {isotp && !isotpVerified && (
                <Input
                  name="otp"
                  label="Enter OTP"
                  handleChange={handleChange}
                  type="text"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  pattern="\d{6}"
                  required
                />
              )}

              {isotp && (
                <Countdown
                  date={timer}
                  intervalDelay={0}
                  precision={3}
                  renderer={renderer}
                />
              )}

              {isotpVerified && (
                <>
                  <Input
                    name="password"
                    label="Password"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                  />
                  <Input
                    name="confirmPassword"
                    label="Repeat Password"
                    handleChange={handleChange}
                    type="password"
                  />
                </>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitbut}
              style={{ marginTop: "1em", marginBottom: "1em" }}
              disabled={isclick}
              disableElevation
            >
              {!isotpVerified &&
                !isclick &&
                (isotp ? "Verfiy Otp" : "Send Otp")}
              {isotpVerified && !isclick && "Reset Password"}
              {isclick && <CircularProgress />}
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ResetPass;
