import '../Form.css';
import './SignupFormPage.css';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signup } from "../../../store/session";
import { addErrors, getErrors, removeErrors } from '../../../store/errors';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const errors = useSelector(getErrors);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(removeErrors());
  }, [dispatch])

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(signup({ email, username, password }))
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

      dispatch(addErrors(errors));
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form className="login-signup" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Create an account</h1>
          </div>
          <div className="form-body">
            <label htmlFor="email" className={errors?.email ? "error" : ""}>
              EMAIL
              { 
                errors?.email
                  ? <span className="errorMessage"> - {errors.email}</span>
                  : ''
              }
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="username" className={errors?.username ? "error" : ""}>
              USERNAME
              { 
                errors?.username 
                  ? <span className="errorMessage"> - {errors.username}</span>
                  : ''
              }
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password" className={errors?.password ? "error" : ""}>
              PASSWORD
              { 
                errors?.password 
                  ? <span className="errorMessage"> - {errors.password}</span>
                  : ''
              }
            </label>
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
    </div>
  );
}

export default SignupFormPage;