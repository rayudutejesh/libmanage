import React, { useState, useEffect, useContext } from "react";
import Book from "./cards/Bookcard";
import NavBar from "./NavBar";
import firebase from "../firebaseConfig";
import spinner from "../images/spin.gif";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
//materialUI
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import { Button, Typography } from "@material-ui/core";

//Styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#13171a",
    minHeight: "100vh",
  },
  load: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",

    padding: "0 10px",
  },
  root1: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(5),
    color: "white",
  },
  image: {
    width: "100px",
    height: "100px",
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
}));

const AuthorDetails = (props) => {
  const classes = useStyles();
  const { currentuser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const { author } = props.match.params;    // getting author name from the paramaters passed through link

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("books")
      .where("author", "==", `${author}`)    // searching books using author name
      .onSnapshot(
        (snapshot) => {
          const allBooks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBooks(allBooks);
        },
        function (error) {
          console.log("error");
        }
      );
    return () => unsubscribe();
  }, [currentuser, props.history, author]);

  //function to delete data from firestore 
  const deleteBook = (id) => {
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
        {books.length > 0 ? (
          <div className={classes.content}>
            <Typography component="h4" variant="h4">
              Name: {books[0].author}
            </Typography>
            <Typography component="h6" variant="h6">
              About: {books[books.length - 1].authdetails}
            </Typography>

            <div className={classes.root1}>
              {books.map((book) => (
                <Book key={book.id} handleDelete={deleteBook} book={{ book }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="spinner">
            <img src={spinner} alt="loading-spinner" />
          </div>
        )}

        <div className={classes.fab}>
          <Link style={{ textDecoration: "none" }} to="/Dashboard">
            <Button>
              <HomeIcon style={{ color: "#009961" }} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
