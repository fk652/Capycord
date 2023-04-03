import './HomeSideBar.css';

import CurrentUserMenu from "../CurrentUserMenu"
import Conversations from "./Conversations"

const HomeSideBar = () => {

  return (
    <div className="home-side-bar">
      <Conversations />
      <CurrentUserMenu />
    </div>
  )
}

export default HomeSideBar