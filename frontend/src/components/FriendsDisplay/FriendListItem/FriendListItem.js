import UserIcon from '../../UserIcon';
import './FriendListItem.css'

const FriendListItem = ({itemId, name, status, customStatus, picture, display, actions}) => {
  // console.log(picture_url);
  const [username, tag] = name.split("#");

  // add onClick handlers for actions here later
  // use userId when dispatching actions to remove friend

  //make seperate click handlers for pending request removal or accepts

  // might make seperate components for actions with props to determine event handler
  // also pass in id and necessary form information as props
  const messageAction = (
    <div className="friend-item-action">
      <span className="action-tooltip">Message</span>
      <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z">
        </path>
      </svg>
    </div>
  )

  const moreAction = (
    <div className="friend-item-action">
      <span className="action-tooltip">More</span>
      <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0z"></path>
          <path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z">
          </path>
        </g>
      </svg>
    </div>
  )

  const acceptRequestAction = (
    <div className="friend-item-action">
      <span className="action-tooltip">Accept</span>
      <svg className="action-icon accept" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z">
        </path>
      </svg>
    </div>
  )

  const deleteRequestAction = (
    <div className="friend-item-action">
      <span className="action-tooltip">Delete</span>
      <svg className="action-icon delete" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
        </path>
      </svg>
    </div>
  )

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
                {messageAction}
                {deleteRequestAction}
              </>
              : actions === "incomingItem"
                ? <>
                    {acceptRequestAction}
                    {deleteRequestAction}
                  </>
                : {deleteRequestAction}
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