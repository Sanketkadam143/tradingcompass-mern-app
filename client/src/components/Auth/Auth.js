import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import Input from "./Input";
import jwt_decode from "jwt-decode";
import { useStateContext } from "../../Contexts/ContextProvider";
import { signin,signup } from "../../actions/auth";


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData,setFormData]=useState(initialState);
  const [checked, setChecked] = useState(false);

  const { user } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const googleSuccess = async (res) => {

    const actualRes = jwt_decode(res.credential);
    const token = res?.credential;
   
    try {
      dispatch({type:'AUTH',data:{actualRes,token}});
      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /* global google */
   
    try {
      google.accounts.id.initialize({
        client_id:
          "730608565545-8jjn15dbk39eht1dn6m4fgm936fr02m4.apps.googleusercontent.com",
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
    if (isSignUp) {
        dispatch(signup(formData, navigate))
    } else {
        dispatch(signin(formData, navigate))
    }
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  };

  const handleCheck = (event) => {
    setChecked(!checked);
  };

  const switchMode = () => setIsSignUp((isSignUp) => !isSignUp);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography varient="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
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
            disabled={!checked && isSignUp}
            disableElevation
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

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
  );
};

export default Auth;
