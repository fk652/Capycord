import './HomeSideBar.css';

import { useParams } from 'react-router-dom';

import CurrentUserMenu from "../CurrentUserMenu"
import Conversations from "./Conversations"
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