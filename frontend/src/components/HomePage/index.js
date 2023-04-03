import "./HomePage.css"

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeSideBar from "../HomeSideBar";
import ServerBar from "../ServerBar";
import FriendsDisplay from "../FriendsDisplay";

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="home">
      <ServerBar />
      <HomeSideBar />
      <FriendsDisplay />
    </div>
  )
}

export default HomePage;