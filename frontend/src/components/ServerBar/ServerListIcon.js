import { useState } from "react";

import { ServerToolTip } from "../../context/Modal";

const ServerListIcon = ({id, image, name}) => {
  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y + 5)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  return (
    <>
      <div 
        id={id} 
        data-key={id} 
        className={`server-icon-wrapper`}
        onMouseEnter={showHandler(id)}
        onMouseLeave={leaveHandler}
        onWheel={leaveHandler}
      >
        {
          image 
            ? <img 
                className="server-icon"
                src={image}
                alt="server-icon"
                data-key={id}
              />
            : <div 
                className="server-icon filler"
                data-key={id}
              >
                {name[0].toUpperCase()}
              </div>
        }
      </div>
      <div className="tab-selector-wrapper">
        <span className="tab-selector" />
      </div>

      {showModal && currentModal===id && (
        <ServerToolTip top={top} onClose={() => setShowModal(false)}>
          <span className="tooltip">{name}</span>
        </ServerToolTip>
      )}
    </>
  )
}

export default ServerListIcon;