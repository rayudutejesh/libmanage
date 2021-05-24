import React, { useContext, useState } from "react"; // add {useCallback, useContext}
import { withRouter, Redirect } from "react-router";
import SignUp from "./Signup";
import Signin from "./SignIn";
import { AuthContext } from "../context/AuthProvider";
import Image from "../images/lib.jpg";

//materialUI

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(5),
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    flex: 1,
    minHeight: "80vh",
  },
  forms: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    flex: 1,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sign: {
    position: "absolute",
    margin: theme.spacing(3, 0, 2),
    right: theme.spacing(20),
    boxShadow: "0 3px 5px 2px rgba(0, 153, 97, .3)",
    height: 30,
    background: "linear-gradient(45deg, #009961 10%, #14181b 60%)",
    color: "white",
    padding: "0 20px",
  },
  signIn: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #009961 10%, #14181b 60%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(0, 153, 97, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  signup: {
    position: "absolute",
    margin: theme.spacing(3, 0, 2),
    right: theme.spacing(5),
    boxShadow: "0 3px 5px 2px rgba(0, 153, 97, .3)",
    height: 30,
    background: "linear-gradient(45deg, #009961 10%, #14181b 60%)",
    color: "white",
    padding: "0 20px",
  },
}));
function Home({ history }) {
  const classes = useStyles();
  const [isSigntab, setSigntab] = useState(false);
  const [isSignup, setSignup] = useState(false);

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/Dashboard" />;
  }

  const handleClick = () => {
    setSigntab((prev) => {
      return !prev;
    });
    setSignup(false);
    console.log(isSigntab);
  };
  const handleSignup = () => {
    setSignup((prev) => {
      return !prev;
    });
    setSigntab(false);
    console.log(isSigntab);
  };

  console.log(isSigntab);
  return (
    <div className={classes.root}>
      <AppBar color="transparent" boxShadow={2} position="static">
        <Toolbar>
          <Button type="submit" className={classes.sign} onClick={handleClick}>
            Sign In
          </Button>
          <Button
            type="submit"
            className={classes.signup}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.form}>
        <div className={classes.content}>
          <div>
            <h1>Welcome to Project.tinker</h1>
            <p>To explore more about the Library Management please SIGN IN..</p>
            <Button
              type="submit"
              variant="contained"
              color="transparent"
              className={classes.signIn}
              onClick={handleClick}
            >
              Sign In
            </Button>
          </div>
        </div>
        <div className={classes.forms}>
          <div>{isSigntab && <Signin />}</div>
          <div>{isSignup && <SignUp />}</div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Home);
