import "./FriendsOnline.css";

import { useSelector } from "react-redux";

import FriendListItem from "../FriendListItem";
import { getFriends } from '../../../store/friends';

const FriendsOnline = () => {
  const friends = useSelector(getFriends);
  let count = 0;
  friends.forEach(friend => {
    if (friend.onlineStatus !== "Offline") count++ 
  })

  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i);
  }
  const status = ["Busy", "Idle", "Do Not Disturb"]
  const customStatus = ["everything is fine 🔥", "bruh 🦫", null, null, null]
  const pictures = [
    "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",
    "https://media.tenor.com/GryShD35-psAAAAC/troll-face-creepy-smile.gif",
    "https://media.tenor.com/jtliaaom4MQAAAAd/clueless-aware.gif",
    null
  ]

  return (
    <>
      <div className="search-bar-wrapper">
        <input className="friend-search-input" type="text" placeholder='Search'/>
        <div className="search-icon-wrapper">
          <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z">
            </path>
          </svg>
        </div>
      </div>
      
      <h2 className="friend-count">ONLINE — {count}</h2>
      <div className="friend-display-wrapper">
        {
          friends.map(friend => {
            return <FriendListItem 
                      itemId={friend.friendshipId}
                      userId={friend.userId}
                      name={friend.username} 
                      status={friend.onlineStatus} 
                      customStatus={friend.customStatus}
                      picture={friend.profilePictureUrl}
                      display="online"
                      actions="friendItem"
                      key={friend.friendshipId}
                  />
          })
        }

        {
          dummies.map(dummyId => {
            return <FriendListItem 
                      itemId={dummyId}
                      userId={dummyId}
                      name={"dummy#dumdum"} 
                      status={status[Math.floor(Math.random()*status.length)]} 
                      customStatus={customStatus[Math.floor(Math.random()*customStatus.length)]}
                      picture={pictures[Math.floor(Math.random()*pictures.length)]}
                      key={dummyId}
                      actions="friendItem"
                  />
          })
        }
      </div>
    </>
  )
}

export default FriendsOnline;