import './FriendListItem.css'

import UserIcon from '../../UserIcon';
import ActionIcon from './ActionIcon';
import { useSelector } from 'react-redux';
import { getFriendSearch, getHomePageLoad } from '../../../store/ui';

const FriendListItem = ({itemId, userId, name, status, customStatus, picture, display, actions}) => {
  const [username, tag] = name.split("#");
  const animate = useSelector(getHomePageLoad);
  const search = useSelector(getFriendSearch);

  const getStatusClass = () => {
    if (status === "Offline" && display === "all" && search) return ""
    else if (status === "Offline") return "offline";
  }

  return (
      <div 
        className={
            `friend-list-item ${display} 
            ${getStatusClass()} 
            ${display === "online" && animate && !search ? "animate" : "hidden"}`
          }
      >
        <div className="friend-item-display">
          <UserIcon picture={picture} status={status} name={username} />
          <div className="friend-item-details">
            <div className="friend-item-name-wrapper">
              <span className="friend-item-username">
                {username}
              </span>
              <span className="friend-item-tag">
                #{tag}
              </span>
            </div>

            {
              actions === "friendItem"
              ? <div className="friend-item-status">
                  <span className="status">{customStatus ? customStatus : status}</span>
                </div>
              : <div className="friend-request-message">
                  <span className="status">{customStatus}</span>
                </div> 
            }
          </div>
        </div>

        <div className="friend-item-options">
          {
            actions === "friendItem"
            ? <>
                <ActionIcon actionType="message" itemId={itemId} />
                <ActionIcon actionType="deleteFriend" itemId={itemId} name={username} />
              </>
              : actions === "incomingItem"
                ? <>
                    <ActionIcon actionType="acceptRequest" itemId={itemId} />
                    <ActionIcon actionType="ignoreRequest" itemId={itemId} />
                  </>
                : actions === "outgoingItem"
                  ? <ActionIcon actionType="cancelRequest" itemId={itemId} />
                  : null
          }
        </div>
      </div>
  )
}

export default FriendListItem;