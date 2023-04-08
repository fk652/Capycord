import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getChannels } from '../../store/channels';
import { getServer } from '../../store/servers';
import ChannelListItem from './ChannelListItem';
import './ChannelSideBar.css'

const ChannelSideBar = () => {
  const {serverId, channelId} = useParams();
  let channels = useSelector(getChannels);
  const serverInfo = useSelector(getServer(serverId));

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

  if (!serverInfo) return <Redirect to={`/home`} />;

  const checkSelected = (id) => {
    if (id.toString() === channelId) return "selected"
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