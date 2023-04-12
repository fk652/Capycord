import './ServerBar.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getSelectedServer, getShowServerModal, setServerFormPage, setServerFormSlide, setShowServerModal } from '../../store/ui';
import ServerListIcon from './ServerListIcon';
import { fetchServers, getServers, resetServers } from '../../store/servers';
import { ServerFormModal, ServerToolTip } from "../../context/Modal";
import ServerForm from '../ServerForm';

const ServerBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  // const [showServerFormModal, setShowServerFormModal] = useState(false);
  const showServerFormModal = useSelector(getShowServerModal);

  const selected = useSelector(getSelectedServer);
  const servers = useSelector(getServers)
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServers())

    return () => {dispatch(resetServers())}
  }, [dispatch])

  const toggleSelected = (e) => {
    if (e.target.dataset.key) {
      if(e.target.dataset.key === "home") history.push(`/home`)
      else if (e.target.dataset.key === "add-server") {
        // console.log("display add server modal") // to do
        dispatch(setShowServerModal(true)) // properly change this later
      }
      else history.push(`/server/${e.target.dataset.key}`);
    }
  }

  const checkSelected = (id) => {
    if (selected === id.toString()) return "selected"
    return ""
  }

  //dummy server icons, remove later
  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i)
  }

  const pictures = [
    "https://pbs.twimg.com/profile_images/1076326143660298245/iaMMNWg9_400x400.jpg",
    "https://metroflowermarket.com/wp-content/uploads/2023/01/RosesRed_Freedom.png",
    "https://s.hdnux.com/photos/01/12/66/62/19623053/4/rawImage.jpg",
    "https://images.immediate.co.uk/production/volatile/sites/7/2021/09/GettyImages-1279734279-24aade8.jpg",
    "https://www.tripsavvy.com/thmb/qFqPcg6Wo24Hu4fLokNfAZdC-xQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
    null
  ]

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y + 5)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  const closeForm = () => {
    dispatch(setShowServerModal(false));
    dispatch(setServerFormPage('start'));
    dispatch(setServerFormSlide(''));
  }

  return (
    <div className="server-bar" onClick={toggleSelected}>
      <div className={`server-item-wrapper ${checkSelected("home")}`}>
        <div 
          id="home"
          data-key="home"
          className="server-icon-wrapper home-icon-wrapper" 
          onMouseEnter={showHandler("home")}
          onMouseLeave={leaveHandler}
        >
          <svg data-key="home" className="home-icon" width="28" height="20" viewBox="0 0 28 20">
            <path data-key="home" fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z">
            </path>
          </svg>
        </div>
        <div className="tab-selector-wrapper">
          <span className="tab-selector" />
        </div>

        {showModal && currentModal === "home" && (
          <ServerToolTip top={top} onClose={() => setShowModal(false)}>
            <span className="tooltip">Direct Messages</span>
          </ServerToolTip>
        )}
      </div>

      <div className="server-divider" />

      {
        servers.map(server => {
          return (
            <div 
              className={`server-item-wrapper ${checkSelected(server.id)}`} 
              key={server.id}
            >
              <ServerListIcon id={server.id} image={server.pictureUrl} name={server.name} />
            </div>
          )
        })
      }

      <div 
        className={`server-item-wrapper ${showServerFormModal ? 'selected' : ''}`}
      >
        <div 
          id="add-server"
          data-key="add-server"
          className="server-icon-wrapper add-server-icon-wrapper" 
          onMouseEnter={showHandler("add-server")}
          onMouseLeave={leaveHandler}
        >
          <svg data-key="add-server" className="add-server-icon" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z">
            </path>
          </svg>
        </div>

        {showModal && currentModal === "add-server" && (
          <ServerToolTip top={top} onClose={() => setShowModal(false)}>
            <span className="tooltip">Add a Server</span>
          </ServerToolTip>
        )}
      </div>

      {showServerFormModal && (
        <ServerFormModal onClose={closeForm}>
          <ServerForm />
        </ServerFormModal>
      )}

      {
        dummies.map(dummyId => {
          return (
            <div className={`server-item-wrapper ${checkSelected(dummyId)}`} key={dummyId}>
              <ServerListIcon id={dummyId} image={pictures[Math.floor(Math.random()*pictures.length)]} name="dummy" />
            </div>
          )
        })
      }
    </div>
  )
}

export default ServerBar;