import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/home.component";
import Created from "./components/created.component";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          A URL Shortener
          <img src={logo} width="30" height="30" alt="corto.roxenoz.xyz" />
          <br />
          <Route path="/" exact component={Home} />
          <Route path="/created/:id" component={Created} />
        </div>
      </Router>
    );
  }
}

export default App;
