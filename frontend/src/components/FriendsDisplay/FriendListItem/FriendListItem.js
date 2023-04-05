import UserIcon from '../../UserIcon';
import './FriendListItem.css'

const FriendListItem = ({name, status, customStatus, picture}) => {
  // console.log(picture_url);
  const [username, tag] = name.split("#");

  return (
    <div className={`friend-list-item ${status}`}>
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
          <span className="friend-item-status">
            {customStatus ? customStatus : status}
          </span>
        </div>
      </div>
      <div className="friend-item-options">
        <div className="friend-item-action">
          <span className="action-tooltip">Message</span>
          <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z">
            </path>
          </svg>
        </div>
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
      </div>
    </div>
  )
}

export default FriendListItem;