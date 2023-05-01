import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addErrors } from '../../../../store/errors'
import { createMessage } from '../../../../store/messages'
import { getResetMessageBox, resetMessageBox, setScroll } from '../../../../store/ui'
import './MessageInput.css'
import { deleteSession } from '../../../../store/session'

const MessageInput = ({channelInfo}) => {
  const boxReset = useSelector(getResetMessageBox);
  const listEle = document.querySelector(".messages-list");
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {e.preventDefault();}
  
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

  useEffect(() => {
    if (boxReset) {
      if (listEle) setTimeout(() => listEle.scrollTo(0, listEle.scrollHeight), 400);
      dispatch(resetMessageBox(false));
    }
  }, [dispatch, boxReset])
  
  const handleKeyDown = (e) => {
    if (e.key === "Shift") setShift(true);
    if (e.key === "Enter") setEnter(true);

    const filteredMessage = message.trim();

    // submit
    if(e.key === "Enter" && !shift && filteredMessage !== '') {
      setMessage('');
      const boxEle = document.querySelector('.message-textarea');
      boxEle.style.height = "22px";
      listEle.scrollTo(0, listEle.scrollHeight);

      dispatch(setScroll(true));
      dispatch(resetMessageBox(true));

      dispatch(createMessage({channelId: channelInfo.id, body: filteredMessage}))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          // data = await res.text();
        }
  
        const errors = {
          status: res.status,
          messages: null
        }

        if (data?.errors) errors.messages = data.errors;

        if (res.status === 401) dispatch(deleteSession())
        else dispatch(addErrors(errors));
      });
      
    }
  }
  
  const handleKeyUp = (e) => {
    if (e.key === "Shift") setShift(false);
    if (e.key === "Enter") setEnter(false);
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