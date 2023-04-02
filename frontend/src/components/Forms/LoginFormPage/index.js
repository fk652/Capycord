import '../Form.css';
import "./LoginFormPage.css";

import { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <div className="form-container">
      <form className="login-signup" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Welcome back!</h1>
          <span>We're capy excited to see you again!</span>
        </div>
        {/* {console.log(errors)} */}
        <div className="form-body">
          <label htmlFor="email" className={errors.login ? "error" : ""}>
            EMAIL
            {
              errors.login
                ? <span className="errorMessage"> - {errors.login}</span>
                : <span className="required">*</span>
            }
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className={errors.login ? "error" : ""}>
            PASSWORD
            {
              errors.login 
                ? <span className="errorMessage"> - {errors.login}</span>
                : <span className="required">*</span>
            }
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