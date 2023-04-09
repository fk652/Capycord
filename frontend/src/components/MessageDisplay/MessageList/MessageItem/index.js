import './MessageItem.css'

import { useState } from 'react';

import { TimeToolTip } from '../../../../context/Modal';

const MessageItem = ({message, user, date, extraTimeInfo}) => {
  // if updatedAt !== createdAt, add edit status
  
  const shortTime = date.toLocaleString(
    'en-us', 
    {
      hour: "numeric", 
      minute: "numeric",
      hour12: true
    }
  );

  const currentDate = new Date()
  const dayDifference = (currentDate.getTime() - date.getTime()) / (1000 * 3600 * 24)
  let dateInfo;
  if (dayDifference < 1) dateInfo = "Today at";
  else if (dayDifference >= 1 && dayDifference < 2) dateInfo = "Yesterday at";
  else dateInfo = date.toLocaleDateString();

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.target.getBoundingClientRect();
    setTop(rect.y - 40)
    setLeft(rect.x - 40)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  if (!user) return null;

  return (
    <div className="message-item-wrapper">
      <div className="profile-pic-wrapper">
        <img className="message-profile-pic" src={user.profilePictureUrl} alt="" />
      </div>

      <div className="message-details-wrapper">
        <h3 className="message-header">
          <div className="author-username">
            {user.username.split("#")[0]}
          </div>

          <div 
            className="message-time long"
            onMouseEnter={showHandler(message.id)}
            onMouseLeave={leaveHandler}
          >
            {showModal && currentModal === message.id && (
              <TimeToolTip top={top} left={left} onClose={() => setShowModal(false)}>
                <span className="tooltip">{`${extraTimeInfo} ${shortTime}`}</span>
              </TimeToolTip>
            )}
            {`${dateInfo} ${shortTime}`}
          </div>
        </h3>
        
        <div className="message-body">
          {message.body}
        </div>
      </div>
    </div>
  )
}

export default MessageItem;