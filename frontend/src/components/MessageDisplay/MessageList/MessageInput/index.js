import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addErrors } from '../../../../store/errors'
import { CreateMessage } from '../../../../store/messages'
import { getResetMessageBox, resetMessageBox, setScroll } from '../../../../store/ui'
import './MessageInput.css'

const MessageInput = ({channelInfo}) => {
  const boxReset = useSelector(getResetMessageBox);
  const listEle = document.querySelector(".messages-list");
  const [message, setMessage] = useState('');
  let shiftPressed = false;
  let enterPressed = false;
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {e.preventDefault();}
  
  const handleChange = (e) => {
    setMessage(e.target.value);
    const setScroll = listEle &&
      (Math.round(listEle.scrollHeight - listEle.scrollTop) === listEle.clientHeight);

    e.target.style.height = "22px";
    const height = e.target.scrollHeight;
    e.target.style.height = `${height}px`;
    
    if (setScroll) listEle.scrollTo(0, listEle.scrollHeight);
  }

  useEffect(() => {
    const boxEle = document.querySelector('.message-textarea');

    if (boxEle.value === '\n' && boxReset) {
      boxEle.style.height = "22px";
      setMessage('');
      boxEle.value = '';
      dispatch(resetMessageBox(false));
    }
  }, [dispatch, resetMessageBox, message])
  
  const handleKeyDown = (e) => {
    if (e.key === "Shift") shiftPressed = true;
    if (e.key === "Enter") enterPressed = true;

    const filteredMessage = message.trim();

    if(enterPressed && !shiftPressed && filteredMessage !== '') {
      dispatch(CreateMessage({channelId: channelInfo.id, body: filteredMessage}))
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
      dispatch(setScroll(true));
      dispatch(resetMessageBox(true));
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
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  )
}

export default MessageInput;