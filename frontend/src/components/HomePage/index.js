import "./HomePage.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import consumer from '../../consumer';

import HomeSideBar from "../HomeSideBar";
import FriendsDisplay from "../FriendsDisplay";
import { setAnimateOfflineFriends, setSelectedServer } from "../../store/ui";
import { addReceivedRequest, addSentRequest, fetchFriendRequests, removeReceivedRequest, removeSentRequest, resetFriendRequests } from "../../store/friendRequests";
import { addFriend, removeFriend, fetchFriends, resetFriends } from "../../store/friends";
import { getCurrentUser } from "../../store/session";

const HomePage = () => {
  const sessionUser = useSelector(getCurrentUser);

  // document.title = `Capycord | Friends`

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
            case "ADD_SENT_REQUEST":
              dispatch(addSentRequest(friendRequest));
              break;
            case "DELETE_SENT_REQUEST":
              dispatch(removeSentRequest(id));
              break;
            case "UPDATE_SENT_REQUEST":
              dispatch(addSentRequest(friendRequest));
              break;
            case "ADD_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            case "DELETE_INCOMING_REQUEST":
              dispatch(removeReceivedRequest(id));
              break;
            case "UPDATE_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            default:
              // console.log("unknown broadcast type");
          }
        }
      }
    );

    return () => {
      friendSubscription?.unsubscribe();
      dispatch(resetFriends());
      dispatch(resetFriendRequests());
      dispatch(setAnimateOfflineFriends(false));
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