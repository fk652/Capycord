import './MessageDisplay.css';
import MemberList from './MemberList';
import MessageNavBar from './MemberNavBar';
import MessageList from './MessageList';

const MessageDisplay = () => {
  return (
    <div className="message-display">
      <MessageNavBar />

      <div className="messages-container">
        <MessageList />
        <MemberList />
      </div>
    </div>
  )
}

export default MessageDisplay;