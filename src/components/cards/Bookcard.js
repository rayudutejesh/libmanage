import React from "react";
import { Link } from "react-router-dom";
//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "50ch",
    height: "15ch",
    margin: theme.spacing(3),
    boxShadow: "0 0 5px 3px rgba(0, 153, 97, .6)",
    backgroundColor: "#13171a",
    color: "white",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: theme.spacing(1),
  },
  image: {
    width: "100px",
    height: "100px",
  },
  deleteButton: {
    display: "flex",
    backgroundColor: "#ffffff",
    width: 0,
  },
  delButton: {
    position: "absolute",
    color: "#009961",
    cursor: "pointer",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Book(props) {
  const classes = useStyles();
  const books = props.book;
  const book = books.book;

  return (
    <Card className={classes.root}>
      <Link
        to={{ pathname: `/book/${book.id}`, title: `${book.title}` }}
        style={{ textDecoration: "none", color: "#009961" }}
        className={classes.details}
      >
        <img src={book.imageURL} alt={book.title} className={classes.image} />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {book.title}
          </Typography>
        </CardContent>
      </Link>

      <DeleteIcon
        className={classes.delButton}
        onClick={() => {
          props.handleDelete(book.id);
        }}
      />
    </Card>
  );
}
