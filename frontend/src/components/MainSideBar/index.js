import './MainSideBar.css';
import { useParams } from 'react-router-dom';
import CurrentUserMenu from "../CurrentUserMenu"
import ConversationSideBar from "./ConversationSideBar"
import ChannelSideBar from '../ChannelSideBar';

const MainSideBar = () => {
  const {serverId} = useParams();

  return (
    <div className="main-side-bar">
      {
        serverId 
          ? <ChannelSideBar />
          : <ConversationSideBar />
      }
      <CurrentUserMenu />
    </div>
  )
}

export default MainSideBar;