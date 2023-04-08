import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchChannels, getChannels } from '../../store/channels';
import { fetchMembers } from '../../store/members';
import { getServer } from '../../store/servers';
import ChannelListItem from './ChannelListItem';
import './ChannelSideBar.css'

const ChannelSideBar = () => {
  const {serverId, channelId} = useParams();
  let channels = useSelector(getChannels);
  const serverInfo = useSelector(getServer(serverId));
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannels(serverId))
    .catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }

      const errors = {
        status: res.status,
        messages: null
      }
      if (data?.errors) errors.messages = data.errors;
      history.push('/home');
    });

    // if (channelId === undefined && (channels && channels.length)) {
    //   history.push(`/server/${serverId}/${channels[0].id}`);
    // }

    dispatch(fetchMembers(serverId));
  }, [dispatch, serverId])


  // if (!serverInfo) return <Redirect to={`/home`} />;
  if (!serverInfo) return <div className="channel-side-bar" />;

  const checkSelected = (id) => {
    if (id.toString() === channelId) return "selected"
    else return ""
  }

  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i);
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