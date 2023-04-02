import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/Forms/SignupFormPage";
import LoginFormPage from "./components/Forms/LoginFormPage";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route exact path="/">
          {/* <SplashPage /> */}
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;