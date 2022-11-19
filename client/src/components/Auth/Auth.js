import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown from "react-countdown";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import Input from "./Input";
import { useStateContext } from "../../Contexts/ContextProvider";
import { signin, signup, googleSignin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [checked, setChecked] = useState(false);
  const [isclick, setIsclick] = useState(false);
  const [isotp, setIsotp] = useState(false);
  const [timer, setTimer] = useState();
  const { user } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.auth.message?.info);

  const googleSuccess = async (res) => {
    const token = res;
    try {
      dispatch(googleSignin(token, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /* global google */

    try {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: googleSuccess,
      });

      user === null && google.accounts.id.prompt();
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        shape: "pill",
        logo_alignment: "center",
        width: "100%",
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsclick(true);
    if (isSignUp) {
      setTimeout(() => dispatch(signup(formData, navigate)), 500);
    } else {
      setTimeout(() => dispatch(signin(formData, navigate)), 500);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (event) => {
    setChecked(!checked);
  };

  const switchMode = () => {
    setIsSignUp((isSignUp) => !isSignUp);
    setIsotp(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const otpSent = () => {
    setIsotp(true);
    setTimer(Date.now() + 120000);
  };

  useEffect(() => {
    setIsclick(false);
    message === "OTP Sent on registered Email" && otpSent();

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
          <Typography varient="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    disabled={isotp}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    disabled={isotp}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                disabled={isotp}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                disabled={isotp}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  disabled={isotp}
                  type="password"
                />
              )}

              {isotp && isSignUp && (
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
            </Grid>
            {isSignUp && (
              <Grid>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheck}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label={
                    <Typography>
                      I have read and agree to{" "}
                      <Link to="/privacypolicy">Privacy Policy</Link>
                    </Typography>
                  }
                />
              </Grid>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitbut}
              style={{ marginTop: "1em" }}
              disabled={(!checked && isSignUp) || isclick}
              disableElevation
            >
              {isclick ? (
                <CircularProgress size={24}/>
              ) : isSignUp ? (
                isotp ? (
                  "Sign Up "
                ) : (
                  "Send OTP"
                )
              ) : (
                "Sign In"
              )}
            </Button>

            {!isSignUp && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    disableElevation
                    onClick={() => navigate("/forget-password")}
                  >
                    Forget Password?
                  </Button>
                </Grid>
              </Grid>
            )}

            {/* Google login Button */}

            <Grid
              container
              justifyContent="center"
              className={classes.googleButton}
            >
              <Button fullWidth disableElevation id="signInDiv">
                Sign in with Google
              </Button>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button disableElevation onClick={switchMode}>
                  {isSignUp
                    ? "Already have an Account? Sign In"
                    : "Don't have an Account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
