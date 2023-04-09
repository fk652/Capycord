import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getChannel } from '../../../store/channels';
import { getMembers, getMembersObject } from '../../../store/members';
import { fetchMessages, getMessages, resetMessages } from '../../../store/messages';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import FirstChannelMessage from './MessageItem/FirstChannelMessage';
import FirstServerMessage from './MessageItem/FirstServerMessage';
import SimpleMessageItem from './MessageItem/SimpleMessageItem';
import TimeDivider from './MessageItem/TimeDivider';
import './MessageList.css'

const MessageList = () => {
  const history = useHistory();
  const {serverId, channelId} = useParams();
  const channelInfo = useSelector(getChannel)
  const messages = useSelector(getMessages);
  const members = useSelector(getMembersObject);
  
  const dispatch = useDispatch();
  useEffect(() => {
    // implement "infinite scroll later" => 50-100 messages at a time giving offsets to controller
    dispatch(fetchMessages(serverId, channelId))
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
      history.push('/home');
    });

    return () => dispatch(resetMessages());
  }, [dispatch, serverId, channelId])

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
              return <>
                      <TimeDivider date={extraTimeInfo} />
                      <MessageItem 
                      message={message} 
                      user={members[message.authorId]} 
                      date={date} 
                      extraTimeInfo={extraTimeInfo} 
                      />
                    </>
            } else if (index === 0 || message.authorId !== messages[index-1].authorId ) {
              return <MessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
                      />
            } else {
              return <SimpleMessageItem 
                        message={message} 
                        user={members[message.authorId]} 
                        date={date} 
                        extraTimeInfo={extraTimeInfo} 
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