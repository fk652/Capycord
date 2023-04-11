import "./HomePage.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import consumer from '../../consumer';

import HomeSideBar from "../HomeSideBar";
import FriendsDisplay from "../FriendsDisplay";
import { setSelectedServer } from "../../store/ui";
import { addReceivedRequest, fetchFriendRequests, removeReceivedRequest, removeSentRequest, resetFriendRequests } from "../../store/friendRequests";
import { addFriend, removeFriend, fetchFriends, resetFriends } from "../../store/friends";

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer("home"));
      dispatch(fetchFriends());
      dispatch(fetchFriendRequests());
    }

    const friendSubscription = consumer.subscriptions.create(
      { channel: 'FriendsChannel' },
      {
        received: ({type, friend, friendRequest, id}) => {
          switch (type) {
            case "UPDATE_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_FRIEND":
              dispatch(removeFriend(id));
              break;
            case "ADD_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_SENT_REQUEST":
              console.log("remove sent");
              dispatch(removeSentRequest(id));
              break;
            case "ADD_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            case "DELETE_INCOMING_REQUEST":
              dispatch(removeReceivedRequest(id));
              break;
            default:
              console.log("unknown broadcast type");
          }
        }
      }
    );

    return () => {
      friendSubscription?.unsubscribe();
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