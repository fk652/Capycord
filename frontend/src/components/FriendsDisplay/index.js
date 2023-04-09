import './FriendsDisplay.css';

import { useDispatch, useSelector } from "react-redux";

import FriendsAdd from './FriendsAdd';
import FriendsAll from './FriendsAll';
import FriendsBlocked from './FriendsBlocked';
import FriendsOnline from './FriendsOnline';
import FriendsPending from './FriendsPending';
import { getSelectedFriendNavTab, setFriendNav } from '../../store/ui';

const FriendsDisplay = () => {
  const selected = useSelector(getSelectedFriendNavTab);
  const dispatch = useDispatch();

  const toggleSelected = (e) => {
    if (e.target.id) dispatch(setFriendNav(e.target.id));
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
    <div className="friends-display">
      <div className="friends-nav-bar">
        <div className="friends-options">
          <div className="icon-wrapper no-hover">
            <svg className="friends-nav-icon" x="0" y="0" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" fillRule="evenodd">
                <path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)">
                </path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z">
                </path>
              </g>
            </svg>
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
            <svg x="0" y="0" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z">
              </path>
            </svg>
          </div>
          <div className="nav-divider"></div>
          <div className="icon-wrapper">
            <svg x="0" y="0" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" fill="currentColor">
              </path>
            </svg>
          </div>
        </div>
      </div>

      {getDisplay()}
    </div>
  )
}

export default FriendsDisplay;