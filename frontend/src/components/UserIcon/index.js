import './UserIcon.css';
import offlineIcon from "../../assets/status_icons/offline.png";
import onlineIcon from "../../assets/status_icons/online.png";
import busyIcon from "../../assets/status_icons/busy.png";
import idleIcon from "../../assets/status_icons/idle.png";

const UserIcon = ({picture_url, status}) => {

  let icon_url;
  switch (status) {
    case "offline":
      icon_url = offlineIcon;
      break;
    case "online":
      icon_url = onlineIcon;
      break;
    case "idle":
      icon_url = idleIcon;
      break;
    case "do not disturb":
      icon_url = busyIcon;
      break;
    case "invisible":
      icon_url = offlineIcon;
      break;
    default:
      icon_url = offlineIcon;
  }

  return (
    <div className="user-icon">
      <img className="user-profile-pic" src={picture_url} alt="user profile icon" />
      <img className="status-icon" src={icon_url} alt="status"/>
    </div>
  )
}

export default UserIcon;