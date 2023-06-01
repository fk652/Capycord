import './ServerPage.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { fetchChannels, resetChannels } from '../../store/channels';
import { addMember, fetchMembers, removeMember, resetMembers } from '../../store/members';
import { setScroll, setSelectedServer } from '../../store/ui';
import { addMessage, fetchMessages, removeMessage, resetMessages } from '../../store/messages';
import { deleteDuplicateSession, getCurrentUser } from '../../store/session';
import { addErrors } from '../../store/errors';
import MainSideBar from '../MainSideBar';
import MessageDisplay from '../MessageDisplay';
import consumer from '../../consumer';

const ServerPage = () => {
  const sessionUser = useSelector(getCurrentUser);
  const {serverId, channelId} = useParams();
  const history = useHistory();
  
  // if (serverInfo) document.title = `Capycord | ${serverInfo.name}`

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
          if (res.status === 401 && !data.errors) dispatch(deleteDuplicateSession());
          else history.push(`/home`);
        });
        dispatch(fetchMembers(serverId));
    }

    const subscription = consumer.subscriptions.create(
      { channel: 'ServersChannel', id: serverId },
      {
        received: ({type, member, id}) => {
          switch (type) {
            case "UPDATE_MEMBER":
              dispatch(addMember(member));
              break;
            case "DELETE_MEMBER":
              dispatch(removeMember(id));
              break;
            case "ADD_MEMBER":
              dispatch(addMember(member));
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
        let data = await res.clone().json();
        
        const errors = {
          status: res.status,
          messages: null
        }
        
        if (data?.errors) errors.messages = data.errors;
        dispatch(addErrors(errors));
        
        if (res.status === 401 && !data.errors) dispatch(deleteDuplicateSession())
        else history.push(`/home`);
      });
    }

    const subscription = consumer.subscriptions.create(
      { channel: 'MessagesChannel', id: channelId },
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
            case "UPDATE_MESSAGE":
              dispatch(addMessage(message));
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
      <MainSideBar />
      {
        channelId 
          ? <MessageDisplay />
          : null
      }
    </div>
  )
}

export default ServerPage;