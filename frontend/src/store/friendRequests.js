import csrfFetch from "./csrf";
import { addErrors } from "./errors";
import { deleteSession } from "./session";
import { setAddFriendResult } from "./ui";

const RESET_FRIEND_REQUESTS = 'friendRequests/resetFriendRequests';
const SET_FRIEND_REQUESTS = 'friendRequests/setFriendRequests';
const ADD_SENT_REQUEST = 'friendRequests/addSentRequest';
const REMOVE_SENT_REQUEST = 'friendRequests/removeSentRequest';
const ADD_RECEIVED_REQUEST = 'friendRequests/addReceivedRequest'; // to be used later
const REMOVE_RECEIVED_REQUEST = 'friendRequests/removeReceivedRequest';

export const resetFriendRequests = () => ({
  type: RESET_FRIEND_REQUESTS
})

const setFriendRequests = (requests) => ({
  type: SET_FRIEND_REQUESTS,
  requests
})

export const addSentRequest = (request) => ({
  type: ADD_SENT_REQUEST,
  request
})

export const removeSentRequest = (requestId) => ({
  type: REMOVE_SENT_REQUEST,
  requestId
})

export const addReceivedRequest = (request) => ({
  type: ADD_RECEIVED_REQUEST,
  request
})

export const removeReceivedRequest = (requestId) => ({
  type: REMOVE_RECEIVED_REQUEST,
  requestId
})

export const getFriendRequests = (state) => {
  return state.friendRequests 
    ? [
        Object.values(state.friendRequests.sent),
        Object.values(state.friendRequests.received) 
      ]
    : [[], []];
}

export const fetchFriendRequests = () => async dispatch => {
  const response = await csrfFetch('/api/friend_requests');

  if (response.ok) {
    const data = await response.json();
    dispatch(setFriendRequests(data.friendRequests));
  }
}

export const createFriendRequest = (username) => async dispatch => {
  const response = await csrfFetch('/api/friend_requests', {
    method: 'POST',
    body: JSON.stringify({username})
  })
  
  dispatch(setAddFriendResult(true));
  return response;
}

export const cancelSentRequest = (requestId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/friend_requests/${requestId}`, {
      method: "DELETE"
    })
    
    // delete request handled with broadcast
    return response;
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
    dispatch(addErrors(errors));
    if (res.status === 401) dispatch(deleteSession());
  }
}

export const acceptReceivedRequest = (requestId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/friend_requests/${requestId}`, {
      method: "PATCH",
      body: JSON.stringify({status: "accepted"})
    })
    
    // delete request and add friend dispatches handled with broadcast
    return response;
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
    dispatch(addErrors(errors));
    if (res.status === 401) dispatch(deleteSession());
  }
}

export const ignoreReceivedRequest = (requestId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/friend_requests/${requestId}`, {
      method: "PATCH",
      body: JSON.stringify({status: "ignored"})
    })
    
    // delete request dispatch handled with broadcast
    return response;
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
    dispatch(addErrors(errors));
    if (res.status === 401) dispatch(deleteSession());
  }
}

const initialState = {
  sent: {},
  received: {}
}

const friendRequestsReducer = (state = initialState, action) => {
  let newState = {sent: {...state.sent}, received: {...state.received}}
  switch (action.type) {
    case RESET_FRIEND_REQUESTS:
      return initialState
    case SET_FRIEND_REQUESTS:
      action.requests 
        ? newState = {sent: {...action.requests.sent}, received: {...action.requests.received}}
        : newState = initialState
      return newState
    case ADD_SENT_REQUEST:
      newState.sent[action.request.requestId] = action.request;
      return newState;
    case REMOVE_SENT_REQUEST:
      delete newState.sent[action.requestId]
      return newState;
    case ADD_RECEIVED_REQUEST:
      newState.received[action.request.requestId] = action.request;
      return newState
    case REMOVE_RECEIVED_REQUEST:
      delete newState.received[action.requestId]
      return newState;
    default:
      return state;
  }
}

export default friendRequestsReducer;