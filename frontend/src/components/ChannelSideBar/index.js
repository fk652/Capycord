import './ChannelSideBar.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getChannels, getChannelServerId } from '../../store/channels';
import { getServer } from '../../store/servers';
import ChannelListItem from './ChannelListItem';
import { DropdownModal, ServerFormModal, SettingPageModal } from '../../context/Modal';
import ServerSettings from '../ServerSettings';
import { getLeaveServerModal, getShowServerAdminModal, setLeaveServerModal, setServerFormPage, setServerFormSlide, setShowServerAdminModal } from '../../store/ui';
import ServerAdminPage from '../ServerAdminPage';
import LeaveForm from './LeaveForm';

const ChannelSideBar = () => {
  const {serverId, channelId} = useParams();
  let channels = useSelector(getChannels);
  let channelServerId = useSelector(getChannelServerId);
  const serverInfo = useSelector(getServer(serverId));
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const showServerAdminPage = useSelector(getShowServerAdminModal);
  const showLeaveModal = useSelector(getLeaveServerModal);

  const dispatch = useDispatch();
  const leaveHandler = () => {
    const modalPage = document.querySelector('.setting-page-modal');
    modalPage.classList.add('hide');

    const appContainer = document.querySelector('.app-container')
    appContainer.removeAttribute('style');
    appContainer.classList.remove('hide');
    appContainer.classList.add('show');

    appContainer.addEventListener("animationend", (e) => {
      appContainer.classList.remove('show');
      dispatch(setShowServerAdminModal(false));
    }, {once: true});
    
    // setTimeout(() => {
    //   appContainer.classList.remove('show');
    //   dispatch(setShowServerAdminModal(false));
    // }, 250);
  }

  if (channelId === undefined && channelServerId === serverId && (channels && channels.length)) {
    history.push(`/server/${serverId}/${channels[0].id}`);
  }

  useEffect(() => {
    const listEle = document.querySelector('.channel-list');
    if (listEle) listEle.scrollTo(0, 0);
  }, [serverId, channelServerId])

  useEffect(() => {
    return () => {
      if (showLeaveModal) dispatch(setLeaveServerModal(false));
    }
  }, [])

  const checkSelected = (id) => {
    if (id.toString() === channelId) return "selected"
    else return ""
  }

  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i);
  }

  const showHandler = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }
  
  const closeLeaveForm = () => {
    const serverFormModal = document.querySelector('.modal-content');
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener("animationend", (e) => {
      dispatch(setLeaveServerModal(false));
      dispatch(setServerFormSlide("expand"));
    }, {once: true})

    // setTimeout(() => {
    //   dispatch(setLeaveServerModal(false));
    //   dispatch(setServerFormPage("start"));
    //   dispatch(setServerFormSlide("expand"));
    // }, 200)
  }

  if (!serverInfo) return <div className="channel-side-bar" />;

  return (
    <>
      <div className="channel-side-bar">
        <div 
          className={`server-settings-dropdown ${showModal ? 'active' : ''}`}
          onClick={showHandler}
        >
          <div className="server-name">
            {serverInfo.name}
          </div>
          <div className="dropdown-button">
            <svg className="dropdown-button-icon" viewBox={`0 ${showModal ? -1 : -6} 15 15`} width="18" height="18">
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h18v18H0"></path>
                <path stroke="currentColor" d="M4.5 4.5l9 9" strokeLinecap="round"></path>
                <path stroke="currentColor" d="M13.5 4.5l-9 9" strokeLinecap="round"></path>
              </g>
            </svg>
          </div>
        </div>

        {showModal && (
          <DropdownModal onClose={() => setShowModal(false)}>
            <ServerSettings serverInfo={serverInfo}/>
          </DropdownModal>
        )}

        {showLeaveModal && (
          <ServerFormModal onClose={closeLeaveForm}>
            <LeaveForm serverName={serverInfo.name} onClose={closeLeaveForm}/>
          </ServerFormModal>
        )}

        <div className='divider' />

        <div className="channel-list">
          {
            channels.map(channel => {
              return (
                <ChannelListItem 
                  id={channel.id} 
                  name={channel.name} 
                  type={channel.channelType}
                  selected={checkSelected(channel.id)}
                  key={channel.id}
                />
              )
            })
          }

          {/* {
            dummies.map(dummy => {
              return <ChannelListItem 
                id={dummy} 
                name={"dummy"} 
                type={["text", "voice", "privateText", "privateVoice"][Math.floor(Math.random()*4)]}
                selected={checkSelected(dummy)}
                key={dummy}
              />
            })
          } */}

          <div className="channel-list-spacer" />
        </div>
      </div>

      { showServerAdminPage && (
        <SettingPageModal onClose={leaveHandler}>
          <ServerAdminPage serverInfo={serverInfo} onClose={leaveHandler}/>
        </SettingPageModal>
      )}
    </>
  )
}

export default ChannelSideBar;