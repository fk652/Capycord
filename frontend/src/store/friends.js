import csrfFetch from "./csrf";
import { addErrors } from "./errors";
import { deleteDuplicateSession } from "./session";

const RESET_FRIENDS = 'friends/resetFriends';
const SET_FRIENDS = 'friends/setFriends';
const ADD_FRIEND = 'friends/addFriend';
const REMOVE_FRIEND = 'friends/removeFriend';

export const resetFriends = () => ({
  type: RESET_FRIENDS
})

const setFriends = (friends) => ({
  type: SET_FRIENDS,
  friends
})

export const addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend
})

export const removeFriend = (friendshipId) => ({
  type: REMOVE_FRIEND,
  friendshipId
})

export const getFriends = (state) => {
  return state.friends 
    ? Object.values(state.friends).sort((a, b) => a.username > b.username ? 1 : -1) 
    : [];
}

export const fetchFriends = () => async dispatch => {
  try {
    const response = await csrfFetch('/api/friends');
  
    if (response.ok) {
      const data = await response.json();
      dispatch(setFriends(data.friends));
    }
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
    if (res.status === 401 && !data.errors) dispatch(deleteDuplicateSession());
  }
}

export const deleteFriend = (friendshipId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/friends/${friendshipId}`, {
      method: "DELETE"
    })
    
    dispatch(removeFriend(friendshipId));
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
    if (res.status === 401 && !data.errors) dispatch(deleteDuplicateSession());
  }
} 

const initialState = null;

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FRIENDS:
      return initialState
    case SET_FRIENDS:
      return {...action.friends}
    case ADD_FRIEND:
      return {...state, [action.friend.friendshipId]: action.friend}
    case REMOVE_FRIEND:
      const newState = {...state}
      delete newState[action.friendshipId]
      return newState;
    default:
      return state;
  }
}

export default friendsReducer;