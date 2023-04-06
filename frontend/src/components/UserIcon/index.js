import './UserIcon.css';
import offlineIcon from "../../assets/status_icons/offline.png";
import onlineIcon from "../../assets/status_icons/online.png";
import busyIcon from "../../assets/status_icons/busy.png";
import idleIcon from "../../assets/status_icons/idle.png";

const UserIcon = ({picture, status, name}) => {

  let iconUrl;
  let noStatus = false;
  switch (status) {
    case "Offline":
      iconUrl = offlineIcon;
      break;
    case "Online":
      iconUrl = onlineIcon;
      break;
    case "Idle":
      iconUrl = idleIcon;
      break;
    case "Do Not Disturb":
      iconUrl = busyIcon;
      break;
    case "Invisible":
      iconUrl = offlineIcon;
      break;
    default:
      iconUrl = offlineIcon;
      noStatus = true;
  }

  return (
    <div className="user-icon">
      {
        picture 
          ? (
            <>
              <img className="user-profile-pic" src={picture} alt="user profile icon" />
              <img className="status-icon" src={iconUrl} alt="status"/>
            </>
          )
          : (
            <div className="filler-container">
              <div className="filler-profile-pic">{name[0].toUpperCase()}</div>
              <img 
                className="filler-status-icon" 
                src={iconUrl} 
                alt="status" 
                visibility={noStatus ? "hidden" : "visible"}
              />
            </div>
          )
      }
    </div>
  )
}

export default UserIcon;