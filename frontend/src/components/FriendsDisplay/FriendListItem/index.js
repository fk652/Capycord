import './FriendListItem.css'

import UserIcon from '../../UserIcon';
import ActionIcon from './ActionIcon';
import { useSelector } from 'react-redux';
import { getHomePageLoad } from '../../../store/ui';

const FriendListItem = ({itemId, userId, name, status, customStatus, picture, display, actions}) => {
  const [username, tag] = name.split("#");
  const animate = useSelector(getHomePageLoad);

  return (
      <div 
        className={
            `friend-list-item ${display} 
            ${status === "Offline" ? "offline" : ""} 
            ${display === "online" && animate ? "animate" : ""}`
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
                  {customStatus ? customStatus : status}
                </div>
              : <div className="friend-request-message">
                  {customStatus}
                </div> 
            }
          </div>
        </div>

        <div className="friend-item-options">
          {
            actions === "friendItem"
            ? <>
                <ActionIcon actionType="message" itemId={itemId} />
                <ActionIcon actionType="deleteFriend" itemId={itemId} />
              </>
              : actions === "incomingItem"
                ? <>
                    <ActionIcon actionType="acceptRequest" itemId={itemId} />
                    <ActionIcon actionType="ignoreRequest" itemId={itemId} />
                  </>
                : actions === "outgoingItem"
                  ? <ActionIcon actionType="cancelRequest" itemId={itemId} />
                  : <></>
          }
        </div>
      </div>
  )
}

export default FriendListItem;