import React from "react";
import Back from "./BackButton";
import firebase from "../firebaseConfig";

//materialUI

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "10vh",
    display: "flex",
    justifyContent: "center",
  },
  menuButton: {
    position: "absolute",
    left: theme.spacing(5),
    top: theme.spacing(1),
    boxShadow: "0 0 5px 4px rgba(0, 153, 97, .5)",
    height: 48,
    color: "white",
  },
  logOut: {
    position: "absolute",
    right: theme.spacing(5),
    border: 0,
    borderRadius: 3,
    boxShadow: "0 0 5px 4px rgba(0, 153, 97, .5)",
    height: 30,
    padding: "0 30px",
    color: "white",
  },
  dashboard: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
}));

function NavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        style={{
          boxShadow: "0 3px 5px 2px rgba(254, 254, 254, .1)",
        }}
        color="transparent"
        boxshadow={2}
        position="static"
      >
        <Toolbar style={{ color: "white" }}>
          {props.name ? (
            <div className={classes.dashboard}>
              <IconButton
                onClick={() => {
                  props.click(props.expand);
                }}
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <Back />
            </IconButton>
          )}

          <Button
            className={classes.logOut}
            onClick={() => firebase.auth().signOut()}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
