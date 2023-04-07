import './ServerPage.css'
import HomeSideBar from '../HomeSideBar';
import MessageDisplay from '../MessageDisplay';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { fetchChannels, resetChannels } from '../../store/channels';

const ServerPage = () => {
  const {serverId} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannels(serverId));

    return () => {
      dispatch(resetChannels());
    }
  }, [dispatch, serverId])

  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="server-page">
      <HomeSideBar />
      <MessageDisplay />
    </div>
  )
}

export default ServerPage;