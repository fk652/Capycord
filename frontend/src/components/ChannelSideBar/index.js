import './ChannelSideBar.css'

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getChannels, getChannelServerId } from '../../store/channels';
import { getServer } from '../../store/servers';
import ChannelListItem from './ChannelListItem';

const ChannelSideBar = () => {
  const {serverId, channelId} = useParams();
  let channels = useSelector(getChannels);
  let channelServerId = useSelector(getChannelServerId);
  const serverInfo = useSelector(getServer(serverId));
  const history = useHistory();

  useEffect(() => {
    if (channelId === undefined && channelServerId === serverId && (channels && channels.length)) {
      history.push(`/server/${serverId}/${channels[0].id}`);
    }
  }, [serverId, channelServerId])

  const checkSelected = (id) => {
    if (id.toString() === channelId) return "selected"
    else return ""
  }

  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i);
  }
  
  if (!serverInfo) return <div className="channel-side-bar" />;

  return (
    <div className="channel-side-bar">
      <div className="server-settings-dropdown">
        <div className="server-name">
          {serverInfo.name}
        </div>
        <div className="dropdown-button">
          <svg className="dropdown-button-icon" width="18" height="18">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h18v18H0"></path>
              <path stroke="currentColor" d="M4.5 4.5l9 9" strokeLinecap="round"></path>
              <path stroke="currentColor" d="M13.5 4.5l-9 9" strokeLinecap="round"></path>
            </g>
          </svg>
        </div>
      </div>

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

        {
          dummies.map(dummy => {
            return <ChannelListItem 
              id={dummy} 
              name={"dummy"} 
              type={["text", "voice", "privateText", "privateVoice"][Math.floor(Math.random()*4)]}
              selected={checkSelected(dummy)}
              key={dummy}
            />
          })
        }
      </div>
    </div>
  )
}

export default ChannelSideBar;