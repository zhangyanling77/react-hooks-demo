import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import About from "./About";
import Other from "./Other";

function RouterComp() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/about" exact component={About} />
            <Route path="/other" exact component={Other}/>
        </Switch>
    </Router>
  )
}

export default  RouterComp;