import './UserIcon.css';

import offlineIcon from "../../assets/status_icons/offline.png";
import onlineIcon from "../../assets/status_icons/online.png";
import busyIcon from "../../assets/status_icons/busy.png";
import idleIcon from "../../assets/status_icons/idle.png";
import dummyIcon from "../../assets/capycord_icons/icon.png";

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

  const handleImageError = (e) => {
    e.preventDefault();
    const newIcon = document.createElement("div");
    newIcon.className = "filler-container";
    newIcon.innerHTML = `<div class="filler-profile-pic">
                            <img class="dummy-pic" src=${dummyIcon} alt="" />
                          </div>
                          <img 
                            class="filler-status-icon" 
                            src=${iconUrl} 
                            alt="status" 
                            visibility=${noStatus ? "hidden" : "visible"}
                          />`
    e.target.parentNode.replaceWith(newIcon)
  }

  return (
    <div className="user-icon">
      {
        picture 
          ? <div className="user-profile-pic-container">
              <img className="user-profile-pic" src={picture} alt="" onError={handleImageError}/>
              <img className="status-icon" src={iconUrl} alt="status"/>
            </div>
          : <div className="filler-container">
              <div className="filler-profile-pic">
                <img className="dummy-pic" src={dummyIcon} alt="" />
              </div>
              <img 
                className="filler-status-icon" 
                src={iconUrl} 
                alt="status" 
                visibility={noStatus ? "hidden" : "visible"}
              />
            </div>
      }
    </div>
  )
}

export default UserIcon;