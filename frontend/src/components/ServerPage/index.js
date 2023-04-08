import './ServerPage.css'
import HomeSideBar from '../HomeSideBar';
import MessageDisplay from '../MessageDisplay';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { resetChannels } from '../../store/channels';
import { resetMembers } from '../../store/members';
import { setSelectedServer } from '../../store/ui';

const ServerPage = () => {
  const {serverId, channelId} = useParams();

  const dispatch = useDispatch();
  dispatch(setSelectedServer(serverId));

  useEffect(() => {
    dispatch(resetChannels());
    dispatch(resetMembers());
  }, [dispatch, serverId])

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="server-page">
      <HomeSideBar />
      {
        channelId 
          ? <MessageDisplay />
          : null
      }
    </div>
  )
}

export default ServerPage;