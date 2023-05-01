import '../MessageInput/MessageInput.css';
// import './MessageItem.css';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addErrors } from '../../../../store/errors'
import { createMessage } from '../../../../store/messages'
import { getResetMessageBox, resetMessageBox, setEditMessageId, setScroll } from '../../../../store/ui'
import { deleteSession } from '../../../../store/session'

const EditMessageInput = ({message}) => {
  // const boxReset = useSelector(getResetMessageBox);
  const listEle = document.querySelector(".messages-list");
  const [messageBody, setMessageBody] = useState(message.body);
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const editInput = document.querySelector('.message-textarea.edit');
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    
    const escListener = (e) => {
      if (e.key === 'Escape') dispatch(setEditMessageId(null));
    }

    document.addEventListener('keydown', escListener);
    return () => {
      document.removeEventListener('keydown', escListener);
    }
  }, [])
  
  const handleChange = (e) => {
    e.preventDefault();
    // handle textarea resizing while typing
    // if message list scrolled to bottom, keep scroll at bottom
    if (enter && !shift) return;
    setMessageBody(e.target.value);

    const scroll = listEle &&
      (Math.round(listEle.scrollHeight - listEle.scrollTop) <= listEle.clientHeight);

    e.target.style.height = "22px";
    const height = e.target.scrollHeight;
    e.target.style.height = `${height}px`;
    
    const messageInput = document.querySelector('.message-input-form.edit');
    const messageBounds = messageInput.getBoundingClientRect();
    const messageBottom = messageBounds.bottom;
    const messageTop = messageBounds.top - 50;

    const listHeight = listEle.offsetHeight + 50;

    if (scroll) listEle.scrollTo(0, listEle.scrollHeight)
    else if (messageBottom > listHeight) listEle.scrollTop = listEle.scrollTop + (messageBottom - listHeight)
    else if (messageTop < 0) listEle.scrollTop = listEle.scrollTop + messageTop
  }

  // useEffect(() => {
  //   if (boxReset) {
  //     if (listEle) setTimeout(() => listEle.scrollTo(0, listEle.scrollHeight), 400);
  //     dispatch(resetMessageBox(false));
  //   }
  // }, [dispatch, boxReset])
  
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
    if (e) e.preventDefault();
    // const boxEle = document.querySelector('.message-textarea');
    // boxEle.style.height = "22px";
    // listEle.scrollTo(0, listEle.scrollHeight);

    // dispatch(setScroll(true));
    // dispatch(resetMessageBox(true));

    // dispatch(createMessage({channelId: channelInfo.id, body: filteredMessage}))
    // .catch(async (res) => {
      //   let data;
    //   try {
    //     data = await res.clone().json();
    //   } catch {
      //     // data = await res.text();
    //   }

    //   const errors = {
    //     status: res.status,
    //     messages: null
    //   }

    //   if (data?.errors) errors.messages = data.errors;
    //   dispatch(addErrors(errors));
      
    //   if (res.status === 401) dispatch(deleteSession())
    // });
    // setMessageBody('');
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