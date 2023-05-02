import './MessageItem.css'

import { useState } from 'react';

import { TimeToolTip } from '../../../../context/Modal';
import MessageEditOptions from './MessageEditOptions';
import { getEditMessageId } from '../../../../store/ui';
import { useSelector } from 'react-redux';
import EditMessageInput from './EditMessageInput';
import EditStatus from './EditStatus';

const MessageItem = ({message, user, date, extraTimeInfo, sessionId}) => {
  // if updatedAt !== createdAt, add edit status
  const editMessageId = useSelector(getEditMessageId);
  
  const shortTime = date.toLocaleString(
    'en-us', 
    {
      hour: "numeric", 
      minute: "numeric",
      hour12: true
    }
  );

  const currentDate = new Date();
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

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y - 40)
    setLeft(rect.x - 70)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  if (!user || !message) return null;

  return (
    <div className={`message-wrapper ${message.id === editMessageId ? 'edit' : ''}`}>
      { 
        (sessionId === message.authorId && message.id !== editMessageId)
          ? <MessageEditOptions messageId={message.id} />
          : null
      }

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
              onMouseOver={showHandler(message.id)}
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
          
          {
            message.id === editMessageId
              ? <EditMessageInput message={message} />
              : <div className="message-body">
                  {message.body}
                  {
                    message.updatedAt !== message.createdAt
                      ? <EditStatus 
                          updateTime={message.updatedAt} 
                          messageId={message.id} 
                        />
                      : ''
                  }
                </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MessageItem;