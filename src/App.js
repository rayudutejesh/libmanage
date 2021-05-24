import React, { Fragment } from "react";
import Home from "./components/Home"
import AddBook from "./components/AddBook";
import Dashboard from "./components/Dashboard";
import BookDetails from "./components/BookDetails";
import AuthorDetails from "./components/AuthorDetails";

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Fragment>
              <div className="content">
                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
                
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/book/:id" component={BookDetails} />
                <PrivateRoute exact path="/author/:author" component={AuthorDetails} />
                <PrivateRoute exact path="/add/book" component={AddBook} />
              </div>
            </Fragment>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
