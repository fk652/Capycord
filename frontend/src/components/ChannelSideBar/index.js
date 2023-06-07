import './ChannelSideBar.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getChannels, getChannelServerId } from '../../store/channels';
import { getServer } from '../../store/servers';
import { DropdownModal, ServerFormModal, SettingPageModal } from '../../context/Modal';
import { getCreateChannelModal, getLeaveServerModal, getShowServerAdminModal, setCreateChannelModal, setLeaveServerModal, setServerFormSlide, setShowServerAdminModal } from '../../store/ui';
import ChannelListItem from './ChannelListItem';
import ServerSettings from './ServerSettings';
import ServerAdminPage from '../ServerAdminPage';
import LeaveForm from './Forms/LeaveForm';
import CreateChannelForm from './Forms/CreateChannelForm';

const ChannelSideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {serverId, channelId} = useParams();
  let channels = useSelector(getChannels);
  let channelServerId = useSelector(getChannelServerId);
  const serverInfo = useSelector(getServer(serverId));
  if (serverInfo) document.title = `Capycord | ${serverInfo.name}`

  const [showModal, setShowModal] = useState(false);
  const showServerAdminPage = useSelector(getShowServerAdminModal);
  const showLeaveModal = useSelector(getLeaveServerModal);
  const showCreateChannelModal = useSelector(getCreateChannelModal);

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
  }

  useEffect(() => {
    if (channelId === undefined && channelServerId === serverId && (channels && channels.length)) {
      history.push(`/server/${serverId}/${channels[0].id}`);
    }
  }, [channelId, channelServerId, serverId, channels])
  
  useEffect(() => {
    const listEle = document.querySelector('.channel-list');
    if (listEle) listEle.scrollTo(0, 0);
  }, [serverId, channelServerId])

  useEffect(() => {
    return () => {
      if (showLeaveModal) dispatch(setLeaveServerModal(false));
      if (showCreateChannelModal) dispatch(setCreateChannelModal(false));
    }
  }, [])

  const checkSelected = (id) => {
    if (id.toString() === channelId) return "selected"
    else return ""
  }

  const showHandler = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }
  
  const closeForm = (modalSetter) => () => {
    const serverFormModal = document.querySelector('.modal-content');
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener("animationend", () => {
      dispatch(modalSetter(false));
    }, {once: true})
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
          <ServerFormModal onClose={closeForm(setLeaveServerModal)}>
            <LeaveForm serverName={serverInfo.name} onClose={closeForm(setLeaveServerModal)}/>
          </ServerFormModal>
        )}

        {showCreateChannelModal && (
          <ServerFormModal onClose={closeForm(setCreateChannelModal)}>
            <CreateChannelForm serverId={serverInfo.id} onClose={closeForm(setCreateChannelModal)}/>
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