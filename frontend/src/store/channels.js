import csrfFetch from "./csrf";
import { unauthorizedSession } from "./session";
import { setHomeRedirect } from "./ui";

const RESET_CHANNELS = 'channels/resetChannels';
const SET_CHANNELS = 'channels/setChannels';
const ADD_CHANNEL = 'channels/addChannel';
const REMOVE_CHANNEL = 'channels/removeChannel';

export const resetChannels = () => ({
  type: RESET_CHANNELS
})

const setChannels = (serverId, channels) => ({
  type: SET_CHANNELS,
  payload: {
    serverId,
    channels
  }
})

export const getChannels = (state) => {
  return state.channels?.channelList ? Object.values(state.channels.channelList) : [];
}

export const getChannel = (id) => (state) => {
  return state.channels?.channelList ? state.channels.channelList[id] : null;
}

export const getChannelServerId = (state) => {
  return state.channels?.serverId ? state.channels.serverId : null;
}

export const fetchChannels = (serverId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/servers/${serverId}/channels`);
  
    const data = await response.json();
    dispatch(setChannels(serverId, data.channels));
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
    else dispatch(setHomeRedirect(true));
  }
}

export const createChannel = (channelData) => async dispatch => {

}

export const updateChannel = (channelData) => async dispatch => {

}

export const deleteChannel = (channelId) => async dispatch => {

}

const initialState = {
  serverId: null,
  channelList: null
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CHANNELS:
      return initialState;
    case SET_CHANNELS:
      return {serverId: action.payload.serverId, channelList: {...action.payload.channels}};
    default:
      return state;
  }
}

export default channelsReducer;