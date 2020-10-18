import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Homepage } from "./views/Homepage";
import { SignUp } from "./views/SignUp";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          <ul>
            <li>
              <Link to="/todo-app">Homepage</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <Redirect to="/todo-app" />
            </Route>
            <Route exact path="/todo-app">
              <Homepage />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}
