import "./HomePage.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import consumer from '../../consumer';

import HomeSideBar from "../HomeSideBar";
import FriendsDisplay from "../FriendsDisplay";
import { setSelectedServer } from "../../store/ui";
import { fetchFriendRequests, resetFriendRequests } from "../../store/friendRequests";
import { addFriend, fetchFriends, resetFriends } from "../../store/friends";

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer("home"));
      dispatch(fetchFriends());
      dispatch(fetchFriendRequests());
    }

    const subscription = consumer.subscriptions.create(
      { channel: 'FriendsChannel' },
      {
        received: ({type, friend, id}) => {
          switch (type) {
            case "UPDATE_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_FRIEND":
              // to do later
              break;
            case "ADD_FRIEND":
              // to do later
              break;
            default:
              console.log("unknown broadcast type");
          }
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetFriends());
      dispatch(resetFriendRequests());
    }
  }, [dispatch])
  
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="home">
      <HomeSideBar />
      <FriendsDisplay />
    </div>
  )
}

export default HomePage;