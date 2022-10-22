import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import DrawerComponent from "./DrawerComponent";
import PopupMenu from "./PopupMenu";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";


// Custom CSS

const useStyles = makeStyles(() => {
  return {
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: "0",
      paddingRight: "0",
    },

    ButtonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "1em",
      marginRight: "2em",
    },

    buttonContainer: {
      display: "flex",
      gap: "1em",
    },

    signoutButton: {
      marginRight: "10em",
    },

    logo: {
    
     height:57

    },
    lastupdate: {
      display: "flex",
      gap: "1em",
      alignItems:"center"
    },
    date: {
      fontSize: "0.7em",
      
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
  };
});

const Navbar = () => {
  //imported and set ismatch value on breakpoints
  const { LivePrice, isMatch, setisMatch,user,setUser} = useStateContext();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const theme = useTheme();
  //Breakpoints

  setisMatch(useMediaQuery(theme.breakpoints.down("md")));

  // set the value for opening popup menu when clicked on profile icon

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const profile = user?.actualRes;

 useEffect(()=>{
    // const token=user?.token;

    //JWT
   setUser(JSON.parse(localStorage.getItem('profile')))

    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[location])

  const logout = () => {
    dispatch({type:'LOGOUT'});
    setUser(null);
    navigate("/auth");
    
  };


  return (
    <>
      <AppBar
        className={classes.appBar}
        color="primary"
        style={{ zIndex: 1251 }}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.lastupdate}>
            <div>
              <Link to="/">
                <img
                  src="projectlogo2.png"
                  alt="logo"
                  className={classes.logo}
                />
              </Link>
            </div>

            <div>
              <p className={classes.date} variant="subtitle2" color="secondary">
                Last Updated on
                <br />
                {LivePrice[0]?._id}
              </p>
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
           
            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      className={classes.purple}
                      alt={profile?.name}
                      src={profile?.picture}
                    ></Avatar>
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
                    <Typography>{profile?.name} </Typography>
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
