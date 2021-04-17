import React from "react";
import "./App.css";
import "./utils/codemirror-github-light-theme.css";
import Main from "./pages/Main";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import 'antd/dist/antd.css';
import "./themes/common.less";
// import "./themes/default.less"
// import "./themes/blue.less"
import HeaderBar from "./components/HeaderBar/index";
import HeaderCommonBar from "./components/HeaderCommonBar/index";
import Square from "./pages/Square";
import "@src/utils/window-event";

function App() {
  return (
    <div className="rs-root">
      <Router>
        <Switch>
          <Route exact path="/">
            <HeaderCommonBar></HeaderCommonBar>
            <HeaderBar></HeaderBar>
            {/* <div className="rs-body"> */}
              <Main></Main>
            {/* </div> */}
          </Route>
          <Route path="/square">
            <HeaderCommonBar></HeaderCommonBar>
            <div className="rs-body">
              <Square></Square>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
