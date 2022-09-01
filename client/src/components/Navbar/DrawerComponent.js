import React, { useState } from "react";
import { Drawer, List, IconButton, Toolbar } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PopupMenu from "./PopupMenu";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    link: {
      textDecoration: "none",
      color: "black",
    },
  };
});

const DrawerComponent = () => {
  //used usestate to set opendrawer value
  const [openDrawer, setOpenDrawer] = useState(false);

  const classes = useStyles();

  //passed the popup menu list item to popup
  return (
    <>
      <Drawer
        style={{ zIndex: 1250 }}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <Toolbar />
        <List style={{ marginTop: "1em" }}>
          <PopupMenu
            name="Options"
            menuItems={[
              "OI Analysis",
              "Call Vs Put  OI",
              "Multi-Strike OI",
              "OI Interval wise",
            ]}
          />

          <PopupMenu
            name="Futures"
            menuItems={["Futures Analysis", "Long Vs Short", "Price Vs OI"]}
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
        </List>
      </Drawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        {openDrawer ? (
          <ClearRoundedIcon
            color="secondary"
            sx={{ fontSize: 40 }}
          ></ClearRoundedIcon>
        ) : (
          <MenuRoundedIcon
            color="secondary"
            sx={{ fontSize: 40 }}
          ></MenuRoundedIcon>
        )}
      </IconButton>
    </>
  );
};

export default DrawerComponent;
