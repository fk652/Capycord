import { useState } from 'react';
import { ActionToolTip } from '../../../../../context/Modal';
import './MessageEditOptions.css'

const MessageEditOptions = ({messageId}) => {
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
    setLeft(rect.x - 20)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  const handleDelete = (e) => {
    e.preventDefault();

    console.log("delete");
  }

  return (
    <div className="message-options-container">
      <div className="edit-container">

      </div>

      <div 
        className="delete-container" 
        onClick={handleDelete}
        onMouseOver={showHandler(messageId)}
        onMouseLeave={leaveHandler}
      >
        {showModal && currentModal === messageId && (
          <ActionToolTip top={top} left={left} onClose={() => setShowModal(false)}>
            <span className="tooltip">Delete</span>
          </ActionToolTip>
        )}

        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z">
          </path>
          <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
          </path>
        </svg>
      </div>
    </div>
  )
}

export default MessageEditOptions;