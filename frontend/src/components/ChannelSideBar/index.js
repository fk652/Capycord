import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link, Redirect } from 'react-router-dom';
import { fetchChannels, getChannels, resetChannels } from '../../store/channels';
import { getServer } from '../../store/servers';
import ChannelListItem from './ChannelListItem';
import './ChannelSideBar.css'

const ChannelSideBar = () => {
  const {serverId, channelId} = useParams();
  let channels = useSelector(getChannels);
  const serverInfo = useSelector(getServer(serverId));
  const history = useHistory();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (channelId === undefined && (channels && channels.length)) {
  //     dispatch(fetchChannels(serverId));
  //     console.log("channels", channels);
  //     history.push(`/server/${serverId}/${channels[0].id}`);
  //   }

  //   // return () => {
  //   //   dispatch(resetChannels());
  //   // }
  // }, [dispatch, serverId, channelId])
  

  // if (!serverInfo) return <Redirect to={`/home`} />;
  // if (channelId === undefined && (channels && channels.length)) return <Redirect to={`/server/${serverId}/${channels[0].id}`} />
  if (!serverInfo) return <Redirect to={`/login`} />;

  const checkSelected = (id) => {
    // console.log("id", id, "channelId", channelId);
    if (!id || !channelId) return "";
    else if (id.toString() === channelId.toString()) return "selected"
    else return ""
  }

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


      </div>
    </div>
  )
}

export default ChannelSideBar;