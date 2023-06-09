import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/Forms/SignupFormPage";
import LoginFormPage from "./components/Forms/LoginFormPage";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";
import ServerBar from "./components/ServerBar";
import ServerPage from "./components/ServerPage";

function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/home">
          <ServerBar />
          <HomePage />
        </Route>
        <Route exact path="/server/:serverId">
          <ServerBar />
          <ServerPage />
        </Route>
        <Route exact path="/server/:serverId/:channelId">
          <ServerBar />
          <ServerPage />
        </Route>
        <Route exact path="/">
          {/* <SplashPage /> */}
          <Redirect to="/login" />
        </Route>
        <Route path="">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;