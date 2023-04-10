import './MessageItem.css'

import { useState } from 'react';

import { TimeToolTip } from '../../../../context/Modal';
import MessageEditOptions from './MessageEditOptions';

const SimpleMessageItem = ({message, date, extraTimeInfo, sessionId}) => {
  // if updatedAt !== createdAt, add edit status
  
  const shortTime = date.toLocaleString(
    'en-us', 
    {
      hour: "numeric", 
      minute: "numeric",
      hour12: true
    }
  );

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

  return (
    <div className="message-wrapper simple">
      { 
        (sessionId === message.authorId)
          ? <MessageEditOptions messageId={message.id} />
          : null
      }
      
      <div className="message-item-wrapper simple">
        <div 
          className="message-time"
          onMouseEnter={showHandler(message.id)}
          onMouseLeave={leaveHandler}
        >
          {showModal && currentModal === message.id && (
            <TimeToolTip top={top} left={left} onClose={() => setShowModal(false)}>
              <span className="tooltip">{`${extraTimeInfo} ${shortTime}`}</span>
            </TimeToolTip>
          )}

          {shortTime}
        </div>
        
        <div className="message-body">
          {message.body}
        </div>
      </div>
    </div>
  )
}

export default SimpleMessageItem;