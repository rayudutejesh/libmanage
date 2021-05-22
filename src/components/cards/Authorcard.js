import React from "react";
import { Link } from "react-router-dom";
//material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "30ch",
    margin: theme.spacing(3),
    borderRadius: 3,
    boxShadow: "0 0 5px 3px rgba(0, 153, 97, .6)",
    backgroundColor: "#13171a",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#13171a",
    color: "#009961",
  },

  image: {
    width: "100px",
    height: "100px",
  },
}));

function Author(props) {
  const classes = useStyles();
  return (
    <Link
      to={{ pathname: `/author/${props.author}` }}
      className={classes.root}
      style={{ textDecoration: "none" }}
    >
      <Card className={classes.details}>
        <CardContent>
          <Typography component="h5" variant="h5">
            {props.author}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
export default Author;
