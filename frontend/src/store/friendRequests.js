import csrfFetch from "./csrf";

const RESET_FRIEND_REQUESTS = 'friendRequests/resetFriendRequests';
const SET_FRIEND_REQUESTS = 'friendRequests/setFriendRequests';
const ADD_SENT_REQUEST = 'friendRequests/addSentRequest';
const ADD_RECEIVED_REQUEST = 'friendRequests/addReceivedRequest'; // to be used later

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

export const addReceivedRequest = (request) => ({
  type: ADD_RECEIVED_REQUEST,
  request
})

export const getFriendRequests = (state) => {
  return state.friendRequests 
    ? [
        Object.values(state.friendRequests.sent),
        Object.values(state.friendRequests.received) 
      ]
    : [];
}

export const fetchFriendRequests = () => async dispatch => {
  const response = await csrfFetch('/api/friend_requests');

  if (response.ok) {
    const data = await response.json();
    dispatch(setFriendRequests(data.friendRequests));
  }
}

const initialState = {
  sent: {},
  received: {}
}

const friendRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FRIEND_REQUESTS:
      return initialState
    case SET_FRIEND_REQUESTS:
      return {sent: {...action.requests.sent}, received: {...action.requests.received}}
    default:
      return state;
  }
}

export default friendRequestsReducer;