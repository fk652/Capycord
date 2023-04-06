import UserIcon from '../../UserIcon';
import './FriendListItem.css'
import ActionIcon from './ActionIcon';

const FriendListItem = ({itemId, name, status, customStatus, picture, display, actions}) => {
  // console.log(picture_url);
  const [username, tag] = name.split("#");

  // add onClick handlers for actions here later
  // use userId when dispatching actions to remove friend

  //make seperate click handlers for pending request removal or accepts

  // might make seperate components for actions with props to determine event handler
  // also pass in id and necessary form information as props
  

  return (
    <div className={`friend-list-item-wrapper`}>
      <div className={`friend-list-item ${display} ${status === "Offline" ? "offline" : ""}`}>
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
              ? <span className="friend-item-status">
                  {customStatus ? customStatus : status}
                </span>
              : <span className="friend-request-message">
                  {customStatus}
                </span> 
            }
          </div>
        </div>

        <div className="friend-item-options">
          {
            actions === "friendItem"
            ? <>
                {/* {messageAction} */}
                {/* {deleteRequestAction} */}
                <ActionIcon actionType="message" itemId={itemId} />
                <ActionIcon actionType="deleteFriend" itemId={itemId} />
              </>
              : actions === "incomingItem"
                ? <>
                    {/* {acceptRequestAction} */}
                    {/* {deleteRequestAction} */}
                    <ActionIcon actionType="acceptRequest" itemId={itemId} />
                    <ActionIcon actionType="ignoreRequest" itemId={itemId} />
                  </>
                : <ActionIcon actionType="cancelRequest" itemId={itemId} />
          }
          {/* {messageAction}
          {moreAction}
          {deleteRequestAction}
          {acceptRequestAction} */}
        </div>
      </div>
    </div>
  )
}

export default FriendListItem;