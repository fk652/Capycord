import './ServerBar.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import consumer from '../../consumer';

import { getDeletedServerId, getNewServer, getSelectedServer, getShowServerModal, setDeletedServerId, setNewServer, setServerFormPage, setServerFormSlide, setShowServerModal } from '../../store/ui';
import ServerListIcon from './ServerListIcon';
import { addServer, fetchServers, getServers, removeServer, resetServers } from '../../store/servers';
import { ServerFormModal, ServerToolTip } from "../../context/Modal";
import ServerForm from '../ServerForm';
import homeIcon from "../../assets/icon.png";
// import inactiveIcon from "../../assets/icon_inactive.png";

const ServerBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const newServerId = useSelector(getNewServer);
  // const [showServerFormModal, setShowServerFormModal] = useState(false);
  const deletedServerId = useSelector(getDeletedServerId);
  const showServerFormModal = useSelector(getShowServerModal);
  const {serverId} = useParams();

  const selected = useSelector(getSelectedServer);
  const servers = useSelector(getServers)
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServers());

    const subscription = consumer.subscriptions.create(
      { channel: 'UsersChannel' },
      {
        received: ({type, server, id}) => {
          console.log(serverId);
          switch (type) {
            // add direct message notifications here later?
            case "UPDATE_SERVER":
              dispatch(addServer(server));
              break;
            case "DELETE_SERVER":
              dispatch(removeServer(id));
              dispatch(setDeletedServerId(id));
              break;
            default:
              // console.log("unknown broadcast type");
          }
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetServers());
    }
  }, [dispatch])

  useEffect(() => {
    if (newServerId) {
      history.push(`/server/${newServerId}`);
      dispatch(setNewServer(null));
    }
  }, [newServerId])

  useEffect(() => {
    if (deletedServerId) {
      console.log(typeof serverId, serverId, typeof deletedServerId, deletedServerId)
      if (serverId === deletedServerId.toString()) history.push('/home');
      dispatch(setDeletedServerId(null));
    }
  }, [deletedServerId])

  const toggleSelected = (e) => {
    if (e.target.dataset.key) {
      if(e.target.dataset.key === "home") history.push(`/home`)
      else if (e.target.dataset.key === "add-server") return;
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
    if (e.type !== 'wheel') e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  const closeForm = () => {
    dispatch(setServerFormSlide("close"));

    setTimeout(() => {
      dispatch(setShowServerModal(false));
      dispatch(setServerFormPage("start"));
      dispatch(setServerFormSlide("expand"));
    }, 200)
  }

  const handleShowForm = (e) => {
    dispatch(setShowServerModal(true));
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
          onWheel={leaveHandler}
        >
          <img 
            data-key="home" 
            className="home-icon"
            src={homeIcon}
            alt='' 
          />
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
        onClick={handleShowForm}
      >
        <div 
          id="add-server"
          data-key="add-server"
          className="server-icon-wrapper add-server-icon-wrapper" 
          onMouseEnter={showHandler("add-server")}
          onMouseLeave={leaveHandler}
          onWheel={leaveHandler}
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

      {/* {
        dummies.map(dummyId => {
          return (
            <div className={`server-item-wrapper ${checkSelected(dummyId)}`} key={dummyId}>
              <ServerListIcon id={dummyId} image={pictures[Math.floor(Math.random()*pictures.length)]} name="dummy" />
            </div>
          )
        })
      } */}
    </div>
  )
}

export default ServerBar;