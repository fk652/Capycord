import './MessageDisplay.css';
import MemberList from '../MemberList';
import MessageNavBar from './MessageNavBar';
import MessageList from './MessageList';

const MessageDisplay = () => {
  return (
    <div className="message-display">
      <MessageNavBar />
      <div className="messages-container">
        <MemberList />
        <MessageList />
      </div>
    </div>
  )
}

export default MessageDisplay;