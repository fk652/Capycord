import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getServer } from '../../../../store/servers';
import './MessageItem.css'

const FirstServerMessage = () => {
  const {serverId} = useParams();
  const serverInfo = useSelector(getServer(serverId));
  if (!serverInfo) return null;

  return (
    <div className="first-server-message">
    
    </div>
  )
}

export default FirstServerMessage;