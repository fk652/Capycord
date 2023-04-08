import './ServerPage.css'
import HomeSideBar from '../HomeSideBar';
import MessageDisplay from '../MessageDisplay';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { fetchChannels, resetChannels } from '../../store/channels';

const ServerPage = () => {
  const {serverId, channelId} = useParams();
  const history = useHistory()

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
      // else if (data) errors.messages = [data];
      // else errors.messages = [res.statusText];

      // dispatch(addErrors(errors));
      history.push('/home');
    });

    return () => {
      dispatch(resetChannels());
    }
  }, [dispatch, serverId])

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="server-page">
      <HomeSideBar />
      {
        channelId 
          ? <MessageDisplay />
          : <> </>
      }
    </div>
  )
}

export default ServerPage;