import './MessageList.css'

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getChannel } from '../../../store/channels';
import { getMembersObject } from '../../../store/members';
import { getMessages} from '../../../store/messages';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import FirstChannelMessage from './MessageItem/FirstChannelMessage';
import FirstServerMessage from './MessageItem/FirstServerMessage';
import SimpleMessageItem from './MessageItem/SimpleMessageItem';
import TimeDivider from './MessageItem/TimeDivider';

const MessageList = () => {
  const channelInfo = useSelector(getChannel)
  const messages = useSelector(getMessages);
  const members = useSelector(getMembersObject);

  // add useEffect to retrieve more messages when scrolled to the top
  // dependency array with scroll height

  useEffect(() => {
    const messageElement = document.querySelector(".messages-list")
    if (messageElement) messageElement.scrollTo(0, messageElement.scrollHeight);
  }, [messages])
  
  if (!messages || !members) return null;

  let previousDate = null;

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
              return <div key={`${message.id} ${extraTimeInfo}`}>
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
            } else if (index === 0 || message.authorId !== messages[index-1].authorId ) {
              return <MessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
                        key={message.id}
                      />
            } else {
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
      </div>
      
      <MessageInput />
    </div>
  )
}

export default MessageList;