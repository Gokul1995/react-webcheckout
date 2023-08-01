import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WebCheckout from "./containers/WebCheckout";
import RedirectPage from "./containers/RedirectPage";
import { TopNav } from "./TopNav";

const Content = () => (
  <Router>
    <TopNav />
    <Switch>
      <Route exact path="/" component={WebCheckout} />
      <Route path="/redirectPage" component={RedirectPage} />
    </Switch>
  </Router>
);
export default function App() {
  return (
    <>
      <Content />
    </>
  );
}
