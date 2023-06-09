import csrfFetch from "./csrf";
import { addErrors } from "./errors";
import { unauthorizedSession } from "./session";
import { setNewServer } from "./ui";

const RESET_SERVERS = 'servers/resetServers';
const SET_SERVERS = 'servers/setServers';
const ADD_SERVER = 'servers/addServer';
const REMOVE_SERVER = 'servers/removeServer';

export const resetServers = () => ({
  type: RESET_SERVERS
})

const setServers = (servers) => ({
  type: SET_SERVERS,
  servers
})

export const addServer = (server) => ({
  type: ADD_SERVER,
  server
})

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  serverId
})

export const getServers = (state) => {
  return state.servers ? Object.values(state.servers) : [];
}

export const getServer = (serverId) => (state) => {
  return state.servers ? state.servers[serverId] : null;
}

export const fetchServers = () => async dispatch => {
  try {
    const response = await csrfFetch('/api/servers');
  
    const data = await response.json();
    dispatch(setServers(data.servers));
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const createServer = (serverData) => async dispatch => {
  try {
    const response = await csrfFetch('/api/servers', {
      method: "POST",
      body: JSON.stringify(serverData)
    })
  
    const data = await response.json();
    dispatch(addServer(data.server));
    dispatch(setNewServer(data.server.id));

    return response;
  } catch (res) {
    const data = await res.clone().json();

    const errors = {
      status: res.status,
      messages: null
    }
    
    if (data?.errors) errors.messages = data.errors;
    dispatch(addErrors(errors));

    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const updateServer = (serverData) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/servers/${serverData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(serverData)
    })

    // update server dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const deleteServer = (serverId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/servers/${serverId}`, {
      method: 'DELETE'
    })

    // delete server dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

const initialState = null;

const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SERVERS:
      return initialState
    case SET_SERVERS:
      return {...action.servers}
    case ADD_SERVER:
      return {...state, [action.server.id]: action.server}
    case REMOVE_SERVER:
      const newState = {...state};
      delete newState[action.serverId];
      return newState
    default:
      return state;
  }
}

export default serversReducer;