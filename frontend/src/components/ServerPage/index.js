import './ServerPage.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import consumer from '../../consumer';

import HomeSideBar from '../HomeSideBar';
import MessageDisplay from '../MessageDisplay';
import { fetchChannels, resetChannels } from '../../store/channels';
import { addMember, fetchMembers, resetMembers } from '../../store/members';
import { setScroll, setSelectedServer } from '../../store/ui';
import { addMessage, fetchMessages, removeMessage, resetMessages } from '../../store/messages';
import { deleteSession, getCurrentUser } from '../../store/session';
import { addErrors } from '../../store/errors';

const ServerPage = () => {
  const sessionUser = useSelector(getCurrentUser);
  
  const {serverId, channelId} = useParams();
  const history = useHistory();
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer(serverId));
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
          dispatch(addErrors(errors));
          // console.log(res.status, errors.messages);
          if (res.status === 401) dispatch(deleteSession());
          else history.push(`/home`);
        });
        dispatch(fetchMembers(serverId));
    }

    const subscription = consumer.subscriptions.create(
      { channel: 'MembersChannel', id: serverId },
      {
        received: ({type, member, id}) => {
          switch (type) {
            case "UPDATE_MEMBER":
              dispatch(addMember(member));
              break;
            case "DELETE_MEMBER":
              // to do later
              break;
            case "ADD_MEMBER":
              // to do later
              break;
            case "ADD_CHANNEL":
              // to do later
              break;
            case "DELETE_CHANNEL":
              // to do later
              break;
            case "UPDATE_CHANNEL":
              // to do later
              break;
            case "UPDATE_SERVER":
              // to do later
              break;
            case "DELETE_SERVER":
              // to do later
              break;
            default:
              // console.log("unknown broadcast type");
          }
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
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
          // data = await res.text();
        }
        
        const errors = {
          status: res.status,
          messages: null
        }
        
        if (data?.errors) errors.messages = data.errors;
        dispatch(addErrors(errors));
        
        if (res.status === 401) dispatch(deleteSession())
        else history.push(`/home`);
      });
    }

    const subscription = consumer.subscriptions.create(
      { channel: 'ServersChannel', id: channelId },
      {
        received: ({type, message, id}) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              const listEle = document.querySelector(".messages-list")
              const atBottom = listEle &&
                (Math.round(listEle.scrollHeight - listEle.scrollTop) <= listEle.clientHeight);
                
              dispatch(addMessage(message));

              if (message.authorId === sessionUser.id || atBottom) dispatch(setScroll(true));
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(id));
              break;
            case "EDIT_MESSAGE":
              // to do later
              break;
            default:
              // console.log("unknown broadcast type");
          }
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