import './MessageList.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getChannel } from '../../../store/channels';
import { getMembersObject } from '../../../store/members';
import { getMessages} from '../../../store/messages';
import { getSetScroll, setQuickDelete, setScroll } from '../../../store/ui';
import { getCurrentUser } from '../../../store/session';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import FirstChannelMessage from './MessageItem/FirstMessages/FirstChannelMessage';
import FirstServerMessage from './MessageItem/FirstMessages/FirstServerMessage';
import SimpleMessageItem from './MessageItem/SimpleMessageItem';
import TimeDivider from './MessageItem/TimeDivider';

const MessageList = () => {
  const dispatch = useDispatch();

  const {channelId} = useParams();
  const [disabled, setDisabled] = useState(false);
  const scroll = useSelector(getSetScroll);
  const channelInfo = useSelector(getChannel(channelId));
  const messages = useSelector(getMessages);
  const members = useSelector(getMembersObject);
  const sessionUser = useSelector(getCurrentUser);

  // add useEffect to retrieve more messages when scrolled to the top
  // with dependency array of scroll height
  
  useEffect(() => {
    const messageElement = document.querySelector(".messages-list")
    if (messageElement && scroll) {
      messageElement.scrollTo(0, messageElement.scrollHeight);
      dispatch(setScroll(false));
    }
  }, [dispatch, messages, scroll])

  useEffect(() => {
    const keydownListener = (e) => {
      const formModal = document.querySelector('.modal-form');
      const adminModal = document.querySelector('.setting-page-modal');
      const dropdownModal = document.querySelector('.server-settings');
      if (formModal || adminModal || dropdownModal) return;

      const editInput = document.querySelector('.message-textarea.edit');
      if (e.key === "Shift" && !e.repeat) {
        dispatch(setQuickDelete(true))
        document.getSelection().removeAllRanges();
      } else if (e.key === "Escape" && editInput) {
        setDisabled(true);
        setTimeout(() => setDisabled(false), 500);
      } else if (e.key === "Escape" && !disabled) {
        const messageElement = document.querySelector(".messages-list");
        if (messageElement) messageElement.scrollTo(0, messageElement.scrollHeight);
      }
    }

    const keyupListener = (e) => {
      e.preventDefault();
      const formModal = document.querySelector('.modal-form');
      const adminModal = document.querySelector('.setting-page-modal');
      const dropdownModal = document.querySelector('.server-settings');
      if (formModal || adminModal || dropdownModal) return;
      else if (e.key === "Shift") dispatch(setQuickDelete(false));
    }

    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    }
  }, [])
  
  let previousDate = null;
  let previousTime = null;
  let previousUser = null;
  let previousUserTime = null;
  if (!messages || !members || !channelInfo) return <div className="message-list-wrapper" />;
  
  return (
    <div className="message-list-wrapper">
      <div className="messages-list">
        {
          channelInfo.first
            ? <FirstServerMessage />
            : <FirstChannelMessage channelInfo={channelInfo} />
        }

        {
          messages.map((message, index) => {
            const date = new Date(message.createdAt);
            let minuteDifference = null;
            let previousUserMinuteDiff = null;
            
            if (previousTime) {
              minuteDifference = (date - previousTime) / (1000 * 60);
            }
            
            if (previousUserTime) {
              previousUserMinuteDiff = (date - previousUserTime) / (1000 * 60);
            }

            const extraTimeInfo = date.toLocaleString(
              'en-us', 
              {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
              }
            );

            if (index === 0 || extraTimeInfo !== previousDate) {
              previousDate = extraTimeInfo;
              previousTime = date;
              previousUser = message.authorId;
              previousUserTime = date;

              return <div key={`${message.id} ${extraTimeInfo}`} className="time-message-wrapper">
                      <TimeDivider 
                        date={extraTimeInfo} 
                        key={extraTimeInfo}
                      />
                      <MessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
                        key={message.id}
                        sessionId={sessionUser.id}
                      />
                    </div>
            } else if (
              index === 0 || 
              message.authorId !== messages[index-1].authorId ||
              minuteDifference > 5 ||
              (message.authorId === previousUser && previousUserMinuteDiff > 10)
            ) {
              previousUser = message.authorId;
              previousUserTime = date;
              previousTime = date;

              return <MessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
                        key={message.id}
                        sessionId={sessionUser.id}
                      />
            } else {
              previousTime = date;
              
              return <SimpleMessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
                        key={message.id}
                        sessionId={sessionUser.id}
                      />
            }
          })
        }
        <div className="message-list-spacer" />
      </div>
      <MessageInput channelInfo={channelInfo}/>
    </div>
  )
}

export default MessageList;