import "./HomePage.css"

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeSideBar from "../HomeSideBar";
import FriendsDisplay from "../FriendsDisplay";
import { setSelectedServer } from "../../store/ui";

const HomePage = () => {
  const dispatch = useDispatch();
  dispatch(setSelectedServer("home"));
  
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />


  return (
    <div className="home">
      {/* <ServerBar /> */}
      <HomeSideBar />
      <FriendsDisplay />
    </div>
  )
}

export default HomePage;