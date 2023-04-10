import './MessageList.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getChannel } from '../../../store/channels';
import { getMembersObject } from '../../../store/members';
import { getMessages} from '../../../store/messages';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import FirstChannelMessage from './MessageItem/FirstChannelMessage';
import FirstServerMessage from './MessageItem/FirstServerMessage';
import SimpleMessageItem from './MessageItem/SimpleMessageItem';
import TimeDivider from './MessageItem/TimeDivider';
import { useParams } from 'react-router-dom';
import { getSetScroll, setScroll } from '../../../store/ui';

const MessageList = () => {
  const {channelId} = useParams();
  const scroll = useSelector(getSetScroll);
  const channelInfo = useSelector(getChannel(channelId));
  const messages = useSelector(getMessages);
  const members = useSelector(getMembersObject);

  // add useEffect to retrieve more messages when scrolled to the top
  // dependency array with scroll height

  const dispatch = useDispatch();
  useEffect(() => {
    const messageElement = document.querySelector(".messages-list")
    if (messageElement && scroll) {
      messageElement.scrollTo(0, messageElement.scrollHeight);
      dispatch(setScroll(false));
    }
  }, [dispatch, messages, scroll])
  
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
            console.log(previousUser, previousUserMinuteDiff)

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
                      />
            } else {
              previousTime = date;
              
              return <SimpleMessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
                        key={message.id}
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