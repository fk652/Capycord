import './ServerBar.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getDeletedServerId, getNewServer, getSelectedServer, getShowServerModal, setDeletedServerId, setNewServer, setServerFormPage, setServerFormSlide, setShowServerModal } from '../../store/ui';
import { addServer, fetchServers, getServers, removeServer, resetServers } from '../../store/servers';
import { ServerFormModal, ServerToolTip } from "../../context/Modal";
import ServerListIcon from './ServerListIcon';
import ServerForm from '../ServerForm';
import homeIcon from "../../assets/capycord_icons/icon.png";
import consumer from '../../consumer';

const ServerBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {serverId} = useParams();
  const selected = useSelector(getSelectedServer);
  const servers = useSelector(getServers)

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const newServerId = useSelector(getNewServer);
  const deletedServerId = useSelector(getDeletedServerId);
  const showServerFormModal = useSelector(getShowServerModal);

  useEffect(() => {
    dispatch(fetchServers());

    const subscription = consumer.subscriptions.create(
      { channel: 'UsersChannel' },
      {
        received: ({type, server, id}) => {
          switch (type) {
            // add direct message notifications here later
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
    const serverFormModal = document.querySelector('.modal-content')
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener("animationend", (e) => {
      dispatch(setShowServerModal(false));
      dispatch(setServerFormPage("start"));
      dispatch(setServerFormSlide("expand"));
    }, {once: true})
  }

  const handleShowForm = () => {
    dispatch(setShowServerModal(true));
  }

  const handleLoad = () => {
    const selectedIcon = document.querySelector(".server-item-wrapper.selected");

    if (selectedIcon?.getBoundingClientRect().bottom > window.innerHeight) {
      selectedIcon.scrollIntoView(false)
    }
  }

  return (
    <div className="server-bar" onClick={toggleSelected} onLoad={handleLoad}>
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
    </div>
  )
}

export default ServerBar;