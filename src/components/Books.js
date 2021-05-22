import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { AuthContext } from "../context/AuthProvider";
import Book from "./cards/Bookcard";
//material UI
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    "& .MuiInputBase-root": {
      width: "80vw",
      borderBottom: "1px solid #009961",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(3),
      color: "white",
    },
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },

  books: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  spin: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
}));


export default function Books(props) {
  const classes = useStyles();
  //setting initial states using hooks
  const { currentuser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  //retrieving data using useeffect hook
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("books")
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
  }, [currentuser, props.history]);

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
      <div>
        <InputBase
          id="title"
          type="text"
          component="h1"
          className="validate"
          value={searchTitle}
          placeholder="searchByTitle"
          fullWidth
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      {books.length > 0 ? (
        <div className={classes.books}>
          {books
            .filter((book) =>
              book.title.toLowerCase().includes(searchTitle.toLowerCase())
            )
            .map((book, index) => (
              <Book
                handleDelete={deleteBook}
                key={book.id}
                id={index}
                book={{ book }}
              />
            ))}
        </div>
      ) : (
        <div  style={{color:"#fff"}}><h3 >No books available</h3></div>
      )}
    </div>
  );
}
