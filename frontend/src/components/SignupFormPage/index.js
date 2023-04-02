import './SignupFormPage.css';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(sessionActions.signup({ email, username, password }))
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
          <h1>Create an account</h1>
        </div>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="body">
          <label for="email">EMAIL</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="username">USERNAME</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label for="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
          <div className="login-link">
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;