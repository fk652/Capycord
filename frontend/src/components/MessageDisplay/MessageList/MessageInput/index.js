import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addErrors } from '../../../../store/errors'
import { CreateMessage } from '../../../../store/messages'
import { setScroll } from '../../../../store/ui'
import './MessageInput.css'

const MessageInput = ({channelInfo}) => {
  const listEle = document.querySelector(".messages-list")
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e) => {e.preventDefault();}
  
  const handleAutoHeight = (e) => {
    if (enterPressed && !shiftPressed) return;

    setMessage(e.target.value);
    const setScroll = listEle &&
      (Math.round(listEle.scrollHeight - listEle.scrollTop) === listEle.clientHeight);

    e.target.style.height = "22px";
    const height = e.target.scrollHeight;
    e.target.style.height = `${height}px`;
    
    if (setScroll) listEle.scrollTo(0, listEle.scrollHeight);
  }
  
  let shiftPressed = false;
  let enterPressed = false;
  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    if (e.key === "Shift") shiftPressed = true;
    if (e.key === "Enter") enterPressed = true;

    if(enterPressed && !shiftPressed && message !== '') {
      dispatch(CreateMessage({channelId: channelInfo.id, body: message}))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
  
        const errors = {
          status: res.status,
          messages: null
        }
        if (data?.errors) errors.messages = data.errors;
        dispatch(addErrors(errors));
      });
      
      setMessage('');
      e.target.value = '';
      e.target.style.height = "22px";
      dispatch(setScroll(true));
    }
  }
  
  const handleKeyUp = (e) => {
    if (e.key === "Shift") shiftPressed = false;
    if (e.key === "Enter") enterPressed = false;
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
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
            onChange={handleAutoHeight}
          />
        </div>
      </div>
    </form>
  )
}

export default MessageInput;