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

    let tooltip = document.createElement('div');
    tooltip.innerHTML = `<div class="time-tooltip"><span class="tooltip">${updatedTime}</span><div class="time-tooltip-pointer" /></div>`;
    tooltip = tooltip.firstChild;
    document.body.appendChild(tooltip);

    const tooltipWidth = tooltip.offsetWidth - 10
    let left = rect.x + ((rect.right - rect.x) / 2) - (tooltipWidth / 2)

    document.body.removeChild(tooltip);

    const diff = (listRect.right - 20) - (left + tooltipWidth)
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