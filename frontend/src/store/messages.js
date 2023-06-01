import csrfFetch from "./csrf";
import { unauthorizedSession } from "./session";
import { setHomeRedirect } from "./ui";

const RESET_MESSAGES = 'messages/resetMessages';
const SET_MESSAGES = 'messages/setMessages';
const ADD_MESSAGE = 'messages/addMessage';
const REMOVE_MESSAGE = 'messages/removeMessage';

export const resetMessages = () => ({
  type: RESET_MESSAGES
})

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages
})

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
})

export const removeMessage = (messageId) => ({
  type: REMOVE_MESSAGE,
  messageId
})

export const getMessages = (state) => {
  return state.messages ? Object.values(state.messages) : null;
}

export const getMessage = (id) => (state) => {
  return state.messages ? state.messages[id] : null;
}

export const fetchMessages = (channelId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/channels/${channelId}/messages`);
  
    const data = await response.json();
    dispatch(setMessages(data.messages));
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
    else dispatch(setHomeRedirect(true));
  }
}

export const createMessage = (message) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify(message)
    })
  
    // add message dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const deleteMessage = (messageId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
      method: 'DELETE'
    })

    // delete message dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

export const updateMessage = (message) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/messages/${message.id}`, {
      method: 'PATCH',
      body: JSON.stringify(message)
    })

    // update message dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
}

const initialState = null

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_MESSAGES:
      return initialState;
    case SET_MESSAGES:
      return {...action.messages};
    case ADD_MESSAGE:
      return {...state, [action.message.id]: action.message}
    case REMOVE_MESSAGE:
      const newState = {...state};
      delete newState[action.messageId];
      return newState
    default:
      return state;
  }
}

export default messagesReducer;