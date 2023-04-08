import csrfFetch from "./csrf";

const RESET_SERVERS = 'servers/resetServers';
const SET_SERVERS = 'servers/setServers';

export const resetServers = () => ({
  type: RESET_SERVERS
})

const setServers = (servers) => ({
  type: SET_SERVERS,
  servers
})

export const getServers = (state) => {
  return state.servers ? Object.values(state.servers) : [];
}

export const getServer = (serverId) => (state) => {
  return state.servers ? state.servers[serverId] : null;
}

export const fetchServers = () => async dispatch => {
  const response = await csrfFetch('/api/servers');

  if (response.ok) {
    const data = await response.json();
    dispatch(setServers(data.servers));
  }
}

export const createServer = (serverData) => async dispatch => {

}

export const updateServer = (serverData) => async dispatch => {

}

export const deleteServer = (serverId) => async dispatch => {

}

const initialState = {}

const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SERVERS:
      return initialState
    case SET_SERVERS:
      return {...action.servers}
    default:
      return state;
  }
}

export default serversReducer;