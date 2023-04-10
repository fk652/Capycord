import './ServerPage.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import consumer from '../../consumer';

import HomeSideBar from '../HomeSideBar';
import MessageDisplay from '../MessageDisplay';
import { fetchChannels, resetChannels } from '../../store/channels';
import { fetchMembers, resetMembers } from '../../store/members';
import { setScroll, setSelectedServer } from '../../store/ui';
import { fetchMessages, resetMessages } from '../../store/messages';
import { getServers } from '../../store/servers';

const ServerPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  
  const {serverId, channelId} = useParams();
  const history = useHistory();
  const servers = useSelector(getServers);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (!servers[serverId]) history.push('/home');
    else if (sessionUser) {
      dispatch(setSelectedServer(serverId));
      dispatch(fetchChannels(serverId))
      // .catch(async (res) => {
        //   let data;
        //   try {
          //     data = await res.clone().json();
        //   } catch {
          //     data = await res.text();
          //   }
          
        //   const errors = {
          //     status: res.status,
        //     messages: null
        //   }
        
        //   if (data?.errors) errors.messages = data.errors;
        //   // dispatch(addErrors(errors));
    
        //   history.push(`/home`);
        // });
        dispatch(fetchMembers(serverId));
    }

    return () => {
      dispatch(resetChannels());
      dispatch(resetMembers());
    }
  }, [dispatch, serverId])
  
  useEffect(() => {
    if (channelId && sessionUser) {
      dispatch(fetchMessages(channelId))
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
        // dispatch(addErrors(errors));
        
        history.push(`/home`);
      });

    }
    
    // const subscription = consumer.subscriptions.create(
    //   { channel: 'ServerssChannel', id: channelId }
    // );

    const subscription = consumer.subscriptions.create(
      { channel: 'ServersChannel', id: channelId },
      {
        received: message => {
          console.log('Received message: ', message);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetMessages());
      dispatch(setScroll(true));
    }
  }, [dispatch, channelId])
  
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