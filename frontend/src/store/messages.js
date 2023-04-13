import csrfFetch from "./csrf";

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
  csrfFetch(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify(message)
  })

  // create handled with broadcast subscription
}

export const deleteMessage = (messageId) => async dispatch => {
  csrfFetch(`/api/messages/${messageId}`, {
    method: 'DELETE'
  })

  // delete handled with broadcast subscription
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