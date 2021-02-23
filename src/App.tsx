import React from "react";
import "./App.css";
import "./utils/codemirror-github-light-theme.css";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./themes/common.less"
// import "./themes/default.less"
import "./themes/blue.less"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
