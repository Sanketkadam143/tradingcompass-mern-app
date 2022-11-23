import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import DrawerComponent from "./DrawerComponent";
import PopupMenu from "./PopupMenu";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT_MSG, LOGOUT } from "../../constants/actionTypes";

// Custom CSS

const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: "2em",
      paddingRight: "2em",
      [theme.breakpoints.down("md")]: {
        paddingLeft: "0",
        paddingRight: "0",
      },
    },

    ButtonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "2em",
      [theme.breakpoints.down("md")]: {
        gap: "0.5em",
      },
      // marginRight: "2em",
    },

    buttonContainer: {
      display: "flex",
      gap: "1em",
    },

    signoutButton: {
      marginRight: "10em",
    },

    logo: {
      height: 57,
    },
    brand: {
      display: "flex",
      gap: "1em",
      alignItems: "center",
    },
    brandName: {
      fontSize: "1.3em",
      color: "black",
      fontWeight: "bold",
    },
    update: {
      opacity: 1,
      color: "rgb(255, 255, 255)",
      background: "#081452",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "999px",
      padding: "0.8em",
      paddingLeft: "3em",
      paddingRight: "3em",
      fontSize: "10px",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
  };
});

const Navbar = () => {
  //imported and set ismatch value on breakpoints
  const { LivePrice, isMatch, setisMatch, user, setUser } = useStateContext();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const theme = useTheme();
  //Breakpoints

  setisMatch(useMediaQuery(theme.breakpoints.down("lg")));

  // set the value for opening popup menu when clicked on profile icon

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    //JWT
    setUser(JSON.parse(localStorage.getItem("profile")));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: "You are Successfully Logged out",
        status: 200,
      },
    });
    setUser(null);
    navigate("/auth");
  };

  return (
    <>
      <AppBar
        className={classes.appBar}
        style={{ zIndex: 1251, backgroundColor: "#ffffff", boxShadow: "none" }}
      >
        <Toolbar>
          <div className={classes.toolbar}>
            <div className={classes.brand}>
              {!useMediaQuery(theme.breakpoints.down("sm")) && (
                <div>
                  <Link to="/">
                    <img
                      src="projectlogo2.png"
                      alt="logo"
                      className={classes.logo}
                    />
                  </Link>
                </div>
              )}
              <div>
                {useMediaQuery(theme.breakpoints.down("sm")) ? (
                  <div>
                    {" "}
                    <p className={classes.update}>
                      Last Updated on
                      <br />
                      {LivePrice[0]?._id}
                    </p>
                  </div>
                ) : (
                  <span className={classes.brandName}>TRADING COMPASS</span>
                )}
              </div>
            </div>
            <div className={classes.ButtonGroup}>
              {isMatch ? (
                <DrawerComponent />
              ) : (
                <>
                  <div className={classes.buttonContainer}>
                    <PopupMenu
                      name="Options"
                      menuItems={[
                        <Link to="/oi-intervalwise" className={classes.link}>
                          OI Analysis
                        </Link>,
                        <Link to="/callvsput" className={classes.link}>
                          Call vs Put OI
                        </Link>,
                        "Multi-Strike OI",
                        "OI Interval wise",
                      ]}
                    />
                    <PopupMenu
                      name="Futures"
                      menuItems={[
                        "Futures Analysis",
                        "Long Vs Short",
                        "Price Vs OI",
                      ]}
                    />
                    <PopupMenu
                      name="Policy"
                      menuItems={[
                        <Link to="/privacypolicy" className={classes.link}>
                          Privacy Policy
                        </Link>,
                        <Link to="/disclaimer" className={classes.link}>
                          Disclaimer
                        </Link>,
                        <Link to="/about" className={classes.link}>
                          About
                        </Link>,
                      ]}
                    />
                    <PopupMenu
                      name="Contact Us"
                      menuItems={[
                        <a
                          className={classes.link}
                          href="mailto: sanketanilkadam@gmail.com"
                        >
                          Email
                        </a>,
                        <a
                          className={classes.link}
                          href="https://instagram.com/sanketkadam_143"
                        >
                          Instagram
                        </a>,
                        <a
                          className={classes.link}
                          href="https://twitter.com/sanketkadam_143"
                        >
                          Twitter
                        </a>,
                      ]}
                    />
                  </div>
                </>
              )}

              {!useMediaQuery(theme.breakpoints.down("sm")) && (
                <div>
                  {" "}
                  <p className={classes.update}>
                    Last Updated on
                    <br />
                    {LivePrice[0]?._id}
                  </p>
                </div>
              )}

              {user && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        className={classes.purple}
                        alt={user?.result?.name}
                        src={user?.result?.picture}
                      >
                        {user?.result?.name?.charAt(0)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography>{user?.result?.name} </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={logout} textalign="center">
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </div>
          </div>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
};

export default Navbar;
