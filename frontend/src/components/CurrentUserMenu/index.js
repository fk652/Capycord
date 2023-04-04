import './CurrentUserMenu.css';

import { useDispatch, useSelector } from "react-redux";
import UserIcon from "../UserIcon";
import { logout } from "../../store/session";

const CurrentUserMenu = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [username, tagNumber] = sessionUser.username.split('#');

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  // console.log(sessionUser);

  return (
    <div className="current-user-menu">
      <div className="current-user-display">
        <UserIcon 
          picture_url={sessionUser.profilePictureUrl}
          status={sessionUser.onlineStatus}
        />
        <div className="username-container">
          <span className="username">{username}</span>
          <span className="tag-number">#{tagNumber}</span>
        </div>
      </div>
      <div className="settings-container">
        <button className="logout-button" onClick={handleClick}>Log Out</button>
      </div>
    </div>
  )
}

export default CurrentUserMenu;