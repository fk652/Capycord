import './ServerPage.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import HomeSideBar from '../HomeSideBar';
import MessageDisplay from '../MessageDisplay';
import { fetchChannels, resetChannels } from '../../store/channels';
import { fetchMembers, resetMembers } from '../../store/members';
import { setScroll, setSelectedServer } from '../../store/ui';
import { fetchMessages, resetMessages } from '../../store/messages';

const ServerPage = () => {
  const {serverId, channelId} = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedServer(serverId));
    dispatch(fetchChannels(serverId));
    dispatch(fetchMembers(serverId));

    return () => {
      dispatch(resetChannels());
      dispatch(resetMembers());
    }
  }, [dispatch, serverId])
  
  useEffect(() => {
    if (channelId) dispatch(fetchMessages(channelId));

    return () => {
      dispatch(resetMessages());
      dispatch(setScroll(true));
    }
  }, [dispatch, channelId])

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