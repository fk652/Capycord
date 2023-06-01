import './MessageInput.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createMessage } from '../../../../store/messages'

const MessageInput = ({channelInfo}) => {
  const dispatch = useDispatch();

  const listEle = document.querySelector(".messages-list");
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  
  const handleSubmit = () => {
    const filtered = message.trim();
    if (!filtered) return;

    dispatch(createMessage({channelId: channelInfo.id, body: filtered}));

    setMessage('');
    const boxEle = document.querySelector('.message-textarea');
    boxEle.style.height = "22px";
  }
  
  const handleChange = (e) => {
    // handle textarea resizing while typing
    // if message list scrolled to bottom, keep scroll at bottom
    if (enter && !shift) return;
    setMessage(e.target.value);

    const scroll = listEle &&
      (Math.round(listEle.scrollHeight - listEle.scrollTop) <= listEle.clientHeight);

    e.target.style.height = "22px";
    const height = e.target.scrollHeight;
    e.target.style.height = `${height}px`;
    
    if (scroll) listEle.scrollTo(0, listEle.scrollHeight);
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Shift") setShift(true);
    if (e.key === "Enter") setEnter(true);
    if (e.key === "Enter" && !shift) handleSubmit();
  }
  
  const handleKeyUp = (e) => {
    if (e.key === "Shift") setShift(false);
    if (e.key === "Enter") setEnter(false);
  }

  const handleFocus = (e) => {
    if (shift) setShift(false); 
  }

  return (
    <form className="message-input-form" onSubmit={e => e.preventDefault()}>
      <div className="message-textarea-wrapper">
        <div className="message-textarea-scroll-wrapper">
          <textarea 
            className="message-textarea"
            type="textarea"
            maxLength="2000"
            placeholder={`Message #${channelInfo.name}`}
            value={message}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </div>
      </div>
    </form>
  )
}

export default MessageInput;