import '../Form.css';
import "./LoginFormPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUser, login } from "../../../store/session";
import { getErrorStatus, getErrors, removeErrors } from '../../../store/errors';
import { getUnauthorized, setUnauthorized } from '../../../store/ui';
import AboutMe from '../../AboutMe';

const LoginForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(getCurrentUser);
  const errors = useSelector(getErrors);
  const errorStatus = useSelector(getErrorStatus);
  const unauthorized = useSelector(getUnauthorized);
  document.title = 'Capycord';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (errors && errorStatus !== 401) dispatch(removeErrors());
    
    return () => {
      if (errors || errorStatus) dispatch(removeErrors());
    }
  }, [dispatch])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());
    if (unauthorized) dispatch(setUnauthorized(false));

    dispatch(login({ email, password }));
  };
    
  const demoLogin = (e, user) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());
    if (unauthorized) dispatch(setUnauthorized(false));

    const email = user === 1 ? 'capybara@gmail.com' : 'capybara2@gmail.com';
    dispatch(login({email, password: 'password123'}));
  }
  
  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="form-wrapper">
      <div className="form-container">
        {
          unauthorized
            ? <span className="unauthorized-message">Must be logged in or logged in elsewhere.</span>
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
              <div className="demo-buttons-container">
                <button className="demo-button" onClick={e => demoLogin(e, 1)}>Login Demo User 1 <br /> (SSJ Capy)</button>
                <button className="demo-button" onClick={e => demoLogin(e, 2)}>Login Demo User 2 <br /> (Capybaby)</button>
              </div>
              <span className="demo-text">
                Login the other user on a different browser or incognito mode
              </span>
            </div>
            <span className="signup-link">Need an account? <Link to="/signup">Register</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;