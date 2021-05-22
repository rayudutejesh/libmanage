import { useHistory } from "react-router-dom";
import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


function BackButton() {
  //using useHistory hook to know previous page
    let history = useHistory();
    return (
        <>
          <KeyboardBackspaceIcon onClick={() => history.goBack()}>Back</KeyboardBackspaceIcon>
        </>
    );
}

export default BackButton;

