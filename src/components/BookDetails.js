import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import spinner from "../images/spin.gif";
import NavBar from "./NavBar";
//materialUI
import { AuthContext } from "../context/AuthProvider";
import HomeIcon from "@material-ui/icons/Home";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    minHeight: "90vh",
    backgroundColor: "#13171a",
  },
  load: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 5px 3px rgba(0, 153, 97, .3)",
    padding: "10px",
    margin: theme.spacing(5),
  },
  image: {
    width: "40ch",
    height: "40ch",
  },
  root1: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "30ch",
    height: "30ch",
    margin: theme.spacing(5),
    backgroundColor: "#13171a",
    color: "white",
  },
  fab: {
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    background: "linear-gradient(45deg, #009961 30%, #fff 90%)",
    border: 0,
    borderRadius: 10,
    boxShadow: "0 0 5px 2px rgba(0, 153, 97, .5)",
    color: "white",
  },
  delete: {
    boxShadow: "0 0 5px 2px rgba(0, 153, 97, .3)",
    borderRadius: 10,
    color: "#009961",
    alignSelf: "center",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#13171a",
    color: "white",
    margin: theme.spacing(3),
  },
}));

const BookDetails = (props) => {
  const classes = useStyles();
  const { currentuser } = useContext(AuthContext);
  const [book, setBook] = useState();
  const { id } = props.match.params; // using the parameters passed getting the book id

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("books")
      .doc(id)
      .onSnapshot(function (doc) {
        setBook(doc.data()); // setting the book state from the data we get using the id
      });

    return () => unsubscribe();
  }, [currentuser, props.history, id]);

  //delete function
  const deleteBook = () => {
    if (window.confirm("Are you sure to delete this book?")) {
      firebase
        .firestore()
        .collection("books")
        .doc(id)
        .delete()
        .then(function () {
          props.history.replace("/");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.load}>
        {book ? (
          <div className={classes.body}>
            <Card className={classes.details}>
              <img
                src={book.imageURL}
                alt={book.title}
                className={classes.image}
              />
            </Card>
            <Card className={classes.details}>
              <div>
                <CardContent>
                  <Typography component="h5" variant="h5">
                    title: {book.title}
                  </Typography>
                  <Typography>genre: {book.genre}</Typography>
                  <Typography variant="subtitle">
                    description: {book.description}
                  </Typography>
                  <Link
                    to={{
                      pathname: `/author/${book.author}`,
                      author: `${book.author}`,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography component="h5" variant="h5">
                      author:{book.author}
                    </Typography>
                  </Link>
                </CardContent>
              </div>
            </Card>
            <Button className={classes.delete} onClick={deleteBook}>
              <DeleteIcon /> Del
            </Button>
          </div>
        ) : (
          <div className="spinner">
            <img src={spinner} alt="loading-spinner" />
          </div>
        )}
        <div className={classes.fab}>
          <Link style={{ textDecoration: "none" }} to="/Dashboard">
            <Button>
              <HomeIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
