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

export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel
})

export const removeChannel = (channelId) => ({
  type: REMOVE_CHANNEL,
  channelId
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
  try {
    const response = await csrfFetch(`/api/channels`, {
      method: 'POST',
      body: JSON.stringify(channelData)
    })

    // add channel dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const updateChannel = (channelData) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/channels/${channelData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(channelData)
    })

    // update channel dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const deleteChannel = (channelId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/channels/${channelId}`, {
      method: 'DELETE'
    })

    // delete channel dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

const initialState = {
  serverId: null,
  channelList: {}
}

const channelsReducer = (state = initialState, action) => {
  let newState = {serverId: state.serverId, channelList: {...state.channelList}};

  switch (action.type) {
    case RESET_CHANNELS:
      return initialState;
    case SET_CHANNELS:
      newState = {serverId: action.payload.serverId, channelList: {...action.payload.channels}};
      return newState;
    case ADD_CHANNEL:
      newState.channelList[action.channel.id] = action.channel;
      return newState;
    case REMOVE_CHANNEL:
      delete newState.channelList[action.channelId];
      return newState;
    default:
      return state;
  }
}

export default channelsReducer;