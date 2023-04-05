import FriendListItem from "../FriendListItem/FriendListItem";
import "./FriendsOnline.css";

const FriendsOnline = ({friends}) => {
  // console.log("online", friends);

  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i);
  }
  const status = ["Busy", "Idle", "Do Not Disturb"]
  const customStatus = ["custom status 🔥", null, null, null]
  const pictures = [
    "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png", 
    "https://e1.pxfuel.com/desktop-wallpaper/197/552/desktop-wallpaper-trollface-elegant-lol-troll-face-vinyl-static-cling-decal-for-you-troll-faces.jpg",
    "https://media.tenor.com/GryShD35-psAAAAC/troll-face-creepy-smile.gif",
    "https://p7.hiclipart.com/preview/859/789/130/rage-comic-drawing-internet-meme-trollface-face.jpg",
    null
  ]

  return (
    <>
      <h2 className="friend-count">ONLINE — {friends.length}</h2>
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

        {
          dummies.map(dummyId => {
            return <FriendListItem 
                      name={"dummy#dumdum"} 
                      status={status[Math.floor(Math.random()*status.length)]} 
                      customStatus={customStatus[Math.floor(Math.random()*customStatus.length)]}
                      picture={pictures[Math.floor(Math.random()*pictures.length)]}
                      key={dummyId}
                  />
          })
        }
      </div>
    </>
  )
}

export default FriendsOnline;