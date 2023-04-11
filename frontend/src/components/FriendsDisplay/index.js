import './FriendsDisplay.css';

import { useSelector } from "react-redux";

import FriendsAdd from './FriendsAdd';
import FriendsAll from './FriendsAll';
import FriendsBlocked from './FriendsBlocked';
import FriendsOnline from './FriendsOnline';
import FriendsPending from './FriendsPending';
import { getSelectedFriendNavTab } from '../../store/ui';
import FriendsNavBar from './FriendsNavBar';

const FriendsDisplay = () => {
  const selected = useSelector(getSelectedFriendNavTab);

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
      <FriendsNavBar />
      {getDisplay()}
    </div>
  )
}

export default FriendsDisplay;