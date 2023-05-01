import '../Form.css';
import "./LoginFormPage.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { getCurrentUser, login } from "../../../store/session";
import { addErrors, getErrorStatus, getErrors, removeErrors } from '../../../store/errors';
import AboutMe from '../../AboutMe';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getCurrentUser);
  const errors = useSelector(getErrors);
  const errorStatus = useSelector(getErrorStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (errors && errorStatus !== 401) dispatch(removeErrors());
    
    return () => {
      if (errors) dispatch(removeErrors());
    }
  }, [dispatch])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ email, password }))
    .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        const errors = {
          status: res.status,
          messages: null
        }

        if (data?.errors) errors.messages = data.errors;
        // else if (data) errors.messages = [data];
        // else errors.messages = [res.statusText];

        dispatch(addErrors(errors))
      });
    };
    
    const demoLogin = (e, user) => {
      e.preventDefault();

      const email = user === 1 ? 'capybara@gmail.com' : 'capybara2@gmail.com'
    return dispatch(login({
      email,
      password: 'password123'
    }))
  }
  
  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="form-wrapper">
      <div className="form-container">
        {
          errorStatus && errorStatus === 401 && !errors
            ? <span className="unauthorized-message">Unauthorized - logged in elsewhere</span>
            : null
        }
        <AboutMe />
        <form className="login-signup" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Welcome back!</h1>
            <span>We're capy excited to see you again!</span>
          </div>
          <div className="form-body">
            <label htmlFor="email" className={errors?.login ? "error" : ""}>
              EMAIL
              {
                errors?.login
                  ? <span className="error-message"> - {errors.login}</span>
                  : <span className="required">*</span>
              }
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className={errors?.login ? "error" : ""}>
              PASSWORD
              {
                errors?.login 
                  ? <span className="error-message"> - {errors.login}</span>
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
            <div className="demo-container">
              <button className="demo-button" onClick={e => demoLogin(e, 1)}>Login as Demo 1</button>
              <button className="demo-button" onClick={e => demoLogin(e, 2)}>Login as Demo 2</button>
            </div>
            <span className="signup-link">Need an account? <Link to="/signup">Register</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;