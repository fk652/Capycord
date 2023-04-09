import "./HomePage.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import HomeSideBar from "../HomeSideBar";
import FriendsDisplay from "../FriendsDisplay";
import { setSelectedServer } from "../../store/ui";
import { fetchFriendRequests, resetFriendRequests } from "../../store/friendRequests";
import { fetchFriends, resetFriends } from "../../store/friends";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedServer("home"));
    dispatch(fetchFriends());
    dispatch(fetchFriendRequests());

    return () => {
      dispatch(resetFriends());
      dispatch(resetFriendRequests());
    }
  }, [dispatch])
  
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="home">
      <HomeSideBar />
      <FriendsDisplay />
    </div>
  )
}

export default HomePage;