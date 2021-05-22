import React, { useState, useEffect } from "react";
import firebase from "../firebaseConfig";
import Author from "./cards/Authorcard";
//materialUI
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth:"80vw",
    "& .MuiInputBase-root": {
      width:"80vw",
      borderBottom:"1px solid #009961",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(3),
    },
  },
  books: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  label_author:{
    color:"#fff",
  },
}));


function Authrs(props) {
  const classes = useStyles();
  //setting states using hooks
  const [Authors, setAuthors] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState("");

  useEffect(() => {

    function a(allBooks) {                                 //function to sort authors array to remove duplicates
      const all = allBooks.map((doc) => doc.author);
      const Author = all.filter(function (elem, pos) {
        return all.indexOf(elem) === pos;
      });
      setAuthors(Author);
    }

 
    const unsubscribe = firebase
      .firestore()
      .collection("books")
      .onSnapshot(
        (snapshot) => {
          const allBooks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          a(allBooks);     //calling the sort function
        },
        function (error) {
          console.log("error");
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={classes.root}>
      
          <InputBase
            id="author"
            type="text"
            fullWidth
            color="primary"
            label="searchByAuthor"
            value={searchAuthor}
            className={classes.label_author}
            placeholder="searchbyAuthor" 
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
        
      
      {Authors.length > 0 ? (
            <div className={classes.books}>
              {Authors
                .filter((book) =>
                  book.toLowerCase().includes(searchAuthor.toLowerCase())
                )
                .map((item,index) => (
                  <Author key ={index} id ={index} author={item}/>
                  // <h1>{index}</h1>
                ))}
            </div>
          ) : (
            <div  style={{color:"#fff"}}><h3 >No Authors available</h3></div>
          )}
    </div>
  );
}

export default Authrs;
