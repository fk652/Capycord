import './FriendsNavBar.css';
import friendIcon from '../../../assets/friend_nav_icons/user.png'
import messageIcon from '../../../assets/friend_nav_icons/chat.png'
import inboxIcon from '../../../assets/friend_nav_icons/inbox.png'

import FriendsAdd from '../FriendsAdd';
import FriendsAll from '../FriendsAll';
import FriendsBlocked from '../FriendsBlocked';
import FriendsOnline from '../FriendsOnline';
import FriendsPending from '../FriendsPending';
import { useState } from 'react';

const FriendsNavBar = () => {

  const [selected, setSelected] = useState("friends-online");

  const toggleSelected = (e) => {
    if (e.target.id)  {
      setSelected(e.target.id)
      // setup friend component to display here later based on selected
      // might have to move navbar directly into FriendsDisplay
    }
  }

  const checkSelected = (id) => {
    if (selected === id) return "selected"
    return ""
  }

  const getDisplay = () => {
    switch (selected) {
      case "friends-online": 
        return <FriendsOnline />;
      case "friends-all":
        return <FriendsAll />;
      case "friends-pending":
        return <FriendsPending />;
      case "friends-blocked":
        return <FriendsBlocked />;
      case "friends-add":
        return <FriendsAdd />
      default:
        return <FriendsOnline />;
    }
  }

  return (
    <>
      <div className="friends-nav-bar">
        <div className="friends-options">
          <div className="icon-wrapper">
            <img className="friends-nav-icon" src={friendIcon} alt="friend-icon"/>
          </div>
          <div className="title-wrapper">
            <h1>Friends</h1>
          </div>
          <div className="nav-divider"></div>
          <div className="options" onClick={toggleSelected}>
            <div 
              className={`option ${checkSelected("friends-online")}`}
              id="friends-online"
            >
              Online
            </div>
            <div 
              className={`option ${checkSelected("friends-all")}`}
              id="friends-all"
            >
              All
            </div>
            <div 
              className={`option ${checkSelected("friends-pending")}`}
              id="friends-pending"
            >
              Pending
            </div>
            <div 
              className={`option ${checkSelected("friends-blocked")}`}
              id="friends-blocked"
            >Blocked</div>
            <div 
              className={`option add-friend ${checkSelected("friends-add")}`}
              id="friends-add"
            >
              Add Friend
            </div>
          </div>
        </div>
        <div className="message-options">
          <div className="icon-wrapper">
            <img className="message-icon" src={messageIcon} alt="message-icon"/>
            {/* <i class="fa fa-inbox"></i> */}
          </div>
          <div className="nav-divider"></div>
          <div className="icon-wrapper">
            <img className="inbox-icon" src={inboxIcon} alt="inbox-icon"/>
            {/* <i class="fa fa-inbox"></i> */}
          </div>
        </div>
      </div>
      {/* {
        selected === "friends-online"
          ? <FriendsOnline />
          : selected === "friends-all"
            ? <FriendsAll />
            : selected === "friends-pending"
              ? <FriendsPending />
              : selected === "friends-blocked"
                ? <FriendsBlocked />
                : selected === "friends-add"
                  ? <FriendsAdd />
                  : <FriendsOnline />
      } */}
      {getDisplay()}
    </>
  )
}

export default FriendsNavBar;