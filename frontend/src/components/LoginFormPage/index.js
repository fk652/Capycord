import "./LoginFormPage.css";

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <div className="form-container">
      <form className="login-signup" onSubmit={handleSubmit}>
        <div className="header">
          <h1>Welcome back!</h1>
          <span>We're capy excited to see you again!</span>
        </div>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="body">
          <label for="email">
            EMAIL
            <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="password">
            PASSWORD
            <span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
          <span className="signup-link">Need an account? <Link to="/signup">Register</Link></span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;