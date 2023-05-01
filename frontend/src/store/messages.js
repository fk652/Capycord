import csrfFetch from "./csrf";
import { deleteSession } from "./session";

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
  const response = await csrfFetch(`/api/channels/${channelId}/messages`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setMessages(data.messages));
  }
}

export const createMessage = (message) => async dispatch => {
  const response = await csrfFetch(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify(message)
  })

  return response;
  // add message to redux store handled with broadcast subscription
}

export const deleteMessage = (messageId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
      method: 'DELETE'
    })
  } catch (res) {
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
    // dispatch(addErrors(errors));
    if (res.status === 401) dispatch(deleteSession());
  }

  // delete message from redux store handled with broadcast subscription
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