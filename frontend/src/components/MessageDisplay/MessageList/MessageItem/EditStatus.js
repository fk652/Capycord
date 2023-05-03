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

    const text = document.createElement('span')
    text.classList.add('tooltip');
    text.innerHTML = updatedTime;
    document.body.appendChild(text);

    const tooltipWidth = text.offsetWidth
    let left = rect.x + ((rect.right - rect.x) / 2) - (tooltipWidth / 2)

    document.body.removeChild(text);

    const diff = (listRect.right - 130) - (left + (tooltipWidth / 2))
    if (diff < 0) {
      left += diff;
      setPointerOffset(-diff);
    }

    setTop(rect.y - 41)
    setLeft(left)
  }

  const leaveHandler = (e) => {
    if (e.type !== 'wheel') e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  return (
    <>
      <span 
        className="edited-status"
        onMouseEnter={showHandler(messageId)}
        onMouseLeave={leaveHandler}
        onWheel={leaveHandler}
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