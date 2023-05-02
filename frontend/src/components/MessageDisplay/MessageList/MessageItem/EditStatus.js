import './MessageItem.css'

import { useState } from 'react';

import { TimeToolTip } from '../../../../context/Modal';

const EditStatus = ({updateTime, messageId}) => {
  const updatedTime = new Date(updateTime).toLocaleString(
    'en-us',
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric", 
      minute: "numeric",
      hour12: true
    }
  ).split(' at ').join(' ')

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [pointerOffset, setPointerOffset] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const listRect = document.querySelector('.messages-list').getBoundingClientRect();
    let xOffset = 90;

    const tooltipLength = updatedTime.length;
    const xDiff = listRect.width + listRect.x - rect.x;
    const bounds = tooltipLength * 5 - 20;
    if (xDiff < bounds) {
      xOffset = bounds;
      setPointerOffset(bounds - 90)
    }

    setTop(rect.y - 40)
    setLeft(rect.x - xOffset)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  return (
    <>
      <span 
        className="edited-status"
        onMouseEnter={showHandler(messageId)}
        onMouseLeave={leaveHandler}
      >
        {' (edited)'}
      </span>

      {showModal && currentModal === messageId && (
        <TimeToolTip 
          top={top} 
          left={left} 
          pointerOffset={pointerOffset} 
          onClose={() => setShowModal(false)}
        >
          <span className="tooltip">{`${updatedTime}`}</span>
        </TimeToolTip>
      )}
    </>
  )
}

export default EditStatus;