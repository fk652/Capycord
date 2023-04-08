import csrfFetch from "./csrf";

const RESET_CHANNELS = 'channels/resetChannels';
const SET_CHANNELS = 'channels/setChannels';
const ADD_CHANNEL = 'channels/addChannel';
const REMOVE_CHANNEL = 'channels/removeChannel';

export const resetChannels = () => ({
  type: RESET_CHANNELS
})

const setChannels = (channels) => ({
  type: SET_CHANNELS,
  channels
})

export const getChannels = (state) => {
  return state.channels ? Object.values(state.channels) : [];
}

export const getChannel = (id) => (state) => {
  return state.channels ? state.channels[id] : null;
}

export const fetchChannels = (serverId) => async dispatch => {
  const response = await csrfFetch(`/api/servers/${serverId}/channels`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setChannels(data.channels));
  }
}

export const createChannel = (channelData) => async dispatch => {

}

export const updateChannel = (channelData) => async dispatch => {

}

export const deleteChannel = (channelId) => async dispatch => {

}

const initialState = {}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CHANNELS:
      return initialState;
    case SET_CHANNELS:
      return {...action.channels};
    default:
      return state;
  }
}

export default channelsReducer;