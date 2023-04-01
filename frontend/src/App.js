import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route exact path="/">
          {/* <SplashPage /> */}
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;