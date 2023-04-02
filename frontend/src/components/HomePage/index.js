import "./HomePage.css"

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div class="home">
      <h1>Home Page</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default HomePage;