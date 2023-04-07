import './HomeSideBar.css';

import CurrentUserMenu from "../CurrentUserMenu"
import Conversations from "./Conversations"
import { useParams } from 'react-router-dom';
import ChannelSideBar from '../ChannelSideBar';

const HomeSideBar = () => {
  const {serverId} = useParams();

  return (
    <div className="home-side-bar">
      {
        serverId 
          ? <ChannelSideBar />
          : <Conversations />
      }
      <CurrentUserMenu />
    </div>
  )
}

export default HomeSideBar