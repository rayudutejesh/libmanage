import React, { useState } from "react";
import { validISBN } from "./Regex";
import firebase from "../firebaseConfig";
//material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { InputBase } from "@material-ui/core";

//styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    minHeight: "90vh",
    width: "80vw",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "& .MuiInputBase-root": {
      borderBottom: "1px solid #009961",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(3),
      color: "#fff",
    },
  },
  imagePrev: {
    width: 200,
    height: 200,
  },
  submit: {
    margin: theme.spacing(5),
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(0, 153, 97, .3)",
    height: 30,
    color: "white",
    padding: "0 30px",
  },
  form: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function AddBook(props) {
  //setting intial states
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    authdetails: "",
    ISBN: "",
  });
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { title, author, genre, description, authdetails, ISBN } = values;
  //validating ISBN using REGEX
  const validateISBN = (ISBN) => {
    if (validISBN.test(ISBN)) {
      setIsValid(true);
    }
  };

  //Reading inputs
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    if (!imageFile) {
      return;
    }
    setImagePreview(URL.createObjectURL(imageFile));

    setImageName(imageFile.name);
  };

  //resetting states function

  const resetForm = () => {
    setValues({
      title: "",
      author: "",
      genre: "",
      description: "",
      authdetails: "",
      ISBN: "",
    });
    setImage("");
    setImagePreview("");
    setImageName("");
  };

  //uploading the inputs to firebase

  const handleSubmit = (e) => {
    e.preventDefault();
    validateISBN(ISBN); //validate isbn
    if (!image) {
      alert("You must choose an image.");
      return;
    }
    if (!(title && author)) {
      alert("Enter title and author.");
      return;
    }
    if (!isValid) {
      alert("ISBN");
      return;
    }

    const fileType = image["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!validImageTypes.includes(fileType)) {
      alert("Not a valid file. Please choose an image.");
      return;
    }

    const uploadTask = firebase.storage().ref(`images/${imageName}`).put(image); //storing image to storage
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },

      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((imageURL) => {
          const newBook = {
            title,
            author,
            genre,
            description,
            ISBN,
            authdetails,
            imageURL,
          }; //getting url and feeding to firestore database
          firebase
            .firestore()
            .collection("books")
            .add(newBook)
            .then(() => {
              alert("book added!!");
              resetForm();
              setImage("");
              setIsValid(false);
              setImagePreview("");
              setImageName("");
            })
            .catch(() => {
              alert("Something went wrong. Please try again.");
              setIsValid(false);
              setImage("");
              setImagePreview("");
              setImageName("");
            });
        });
      }
    );
    setImage("");
    setImagePreview("");
    setImageName("");
  };

  return (
    <div className={classes.root}>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div>
          <InputBase
            id="standard-textarea"
            label="title"
            placeholder="title"
            multiline
            className={classes.textField}
            onChange={handleChange("title")}
            value={title}
          />
          <InputBase
            id="standard-textarea"
            label="genre"
            placeholder="genre"
            multiline
            className={classes.textField}
            onChange={handleChange("genre")}
            value={genre}
          />
        </div>
        <div>
          <InputBase
            id="standard-textarea"
            label="description"
            placeholder="description"
            multiline
            className={classes.textField}
            onChange={handleChange("description")}
            value={description}
          />
          <InputBase
            id="standard-textarea"
            label="ISBN"
            placeholder="ISBN"
            multiline
            className={classes.textField}
            onChange={handleChange("ISBN")}
            value={ISBN}
          />
        </div>
        <div>
          <InputBase
            id="standard-textarea"
            label="author"
            placeholder="author"
            multiline
            className={classes.textField}
            onChange={handleChange("author")}
            value={author}
          />
          <InputBase
            id="standard-textarea"
            placeholder="Author details"
            multiline
            className={classes.textField}
            onChange={handleChange("authdetails")}
            value={authdetails}
          />
        </div>
        <div style={{ color: "#009961" }}>
          book cover
          <InputBase
            type="file"
            className={classes.textField}
            onChange={uploadImage}
            accept="image/*"
          />
        </div>
        <Button onClick={handleSubmit} className={classes.submit}>
          Add
        </Button>
      </form>

      <div>
        <img src={imagePreview} alt={imageName} className={classes.imagePrev} />
      </div>
    </div>
  );
}

export default AddBook;
