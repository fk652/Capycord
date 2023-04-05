import "./FriendsAll.css";
import FriendListItem from "../FriendListItem/FriendListItem";

const FriendsAll = ({friends}) => {
  // console.log(friends);
  
  return (
    <>
      <h2 className="friend-count">ALL FRIENDS — {friends.length}</h2>
      <div className="friend-display-wrapper">
        {
          friends.map(friend => {
            return <FriendListItem 
                      name={friend.username} 
                      status={friend.onlineStatus} 
                      customStatus={friend.customStatus}
                      picture={friend.profilePictureUrl}
                      key={friend.id}
                  />
          })
        }
      </div>
    </>
  )
}

export default FriendsAll;