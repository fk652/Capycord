import '../MessageInput/MessageInput.css';
// import './MessageItem.css';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addErrors } from '../../../../store/errors'
import { createMessage, updateMessage } from '../../../../store/messages'
import { getResetMessageBox, resetMessageBox, setEditMessageId, setScroll } from '../../../../store/ui'
import { deleteSession } from '../../../../store/session'

const EditMessageInput = ({message}) => {
  const listEle = document.querySelector(".messages-list");
  const [messageBody, setMessageBody] = useState(message.body);
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const editInput = document.querySelector('.message-textarea.edit');
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    fixScroll(editInput);

    const escListener = (e) => {
      if (e.key === 'Escape') dispatch(setEditMessageId(null));
    }
    document.addEventListener('keydown', escListener);

    return () => {
      document.removeEventListener('keydown', escListener);
    }
  }, [listEle])

  const fixScroll = (inputEle) => {
    if (!inputEle || !listEle) return;

    const scroll = listEle &&
      (Math.round(listEle.scrollHeight - listEle.scrollTop) <= listEle.clientHeight);

    inputEle.style.height = "22px";
    const height = inputEle.scrollHeight;
    inputEle.style.height = `${height}px`;
    
    const messageInput = document.querySelector('.message-input-form.edit');
    const messageBounds = messageInput.getBoundingClientRect();
    const messageBottom = messageBounds.bottom;
    const messageTop = messageBounds.top - 50;

    const listHeight = listEle.offsetHeight + 50;

    if (scroll) listEle.scrollTo(0, listEle.scrollHeight)
    else if (messageBottom > listHeight) listEle.scrollTop = listEle.scrollTop + (messageBottom - listHeight)
    else if (messageTop < 0) listEle.scrollTop = listEle.scrollTop + messageTop
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    // handle textarea resizing while typing
    // if message list scrolled to bottom, keep scroll at bottom
    if (enter && !shift) return;
    setMessageBody(e.target.value);

    fixScroll(e.target);
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Shift") setShift(true);
    if (e.key === "Enter") setEnter(true);

    const filteredMessage = messageBody.trim();

    // submit
    if(e.key === "Enter" && !shift && filteredMessage !== '') {
      setMessageBody(filteredMessage);
      handleSubmit();
    }
  }
  
  const handleKeyUp = (e) => {
    if (e.key === "Shift") setShift(false);
    if (e.key === "Enter") setEnter(false);
  }

  const handleCancel = (e) => {
    if (e) e.preventDefault();
    dispatch(setEditMessageId(null));
  }

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      const filteredMessage = messageBody.trim();
      setMessageBody(filteredMessage);
    }

    // const boxEle = document.querySelector('.message-textarea');
    // boxEle.style.height = "22px";
    // listEle.scrollTo(0, listEle.scrollHeight);
    dispatch(setEditMessageId(null));
    const editedMessage = {...message, body: messageBody};
    dispatch(updateMessage(editedMessage));
  }

  return (
    <form className="message-input-form edit" onSubmit={(e) => e.preventDefault()}>
      <div className="message-textarea-wrapper edit">
        <div className="message-textarea-scroll-wrapper edit">
          <textarea 
            className="message-textarea edit"
            type="textarea"
            maxLength="2000"
            value={messageBody}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="edit-message-instructions">
        {'escape to '} 
        <span className="edit-shortcut" onClick={handleCancel}>cancel</span> 
        {' • enter to '} 
        <span className="edit-shortcut" onClick={handleSubmit}>save</span>
      </div>
    </form>
  )
}

export default EditMessageInput;