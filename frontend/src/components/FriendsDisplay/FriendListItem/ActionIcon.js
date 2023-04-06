import './FriendListItem.css'

const ActionIcon = ({actionType, itemId}) => {
  // delete friend handler

  // ignore friend request handler

  // accept friend request handler

  // cancel friend request handler (might be same as ignore)



  const messageIcon = (
    <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z">
      </path>
    </svg>
  )

  const moreIcon = (
    <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="M24 0v24H0V0z"></path>
        <path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z">
        </path>
      </g>
    </svg>
  )

  const acceptIcon = (
    <svg className="action-icon accept" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z">
      </path>
    </svg>
  )

  const deleteIcon = (
    <svg className="action-icon delete" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
      </path>
    </svg>
  )

  let icon, tooltipText, clickHandler;
  switch (actionType) {
    case "message":
      icon = messageIcon;
      tooltipText = "Message";
      clickHandler = null; //replace later with correct dispatch
      break;
    case "deleteFriend":
      icon = deleteIcon;
      tooltipText = "Remove Friend";
      clickHandler = null; //replace later with correct dispatch
      break;
    case "ignoreRequest":
      icon = deleteIcon;
      tooltipText = "Ignore";
      clickHandler = null; //replace later with correct dispatch
      break;
    case "acceptRequest":
      icon = acceptIcon;
      tooltipText = "Accept";
      clickHandler = null; //replace later with correct dispatch
      break;
    case "cancelRequest":
      icon = deleteIcon;
      tooltipText = "Cancel";
      clickHandler = null; //replace later with correct dispatch
      break;
    default:

  }

  return (
    <div className="friend-item-action" onClick={clickHandler}>
      <span className="action-tooltip">{tooltipText}</span>
      {icon}
    </div>
  )
}

export default ActionIcon;