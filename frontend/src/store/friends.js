import csrfFetch from "./csrf";

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

const removeFriend = (friendshipId) => ({
  type: REMOVE_FRIEND,
  friendshipId
})

export const getFriends = (state) => {
  return state.friends ? Object.values(state.friends) : [];
}

export const fetchFriends = () => async dispatch => {
  const response = await csrfFetch('/api/friends');

  if (response.ok) {
    const data = await response.json();
    dispatch(setFriends(data.friends));
  }
}

export const deleteFriend = (friendshipId) => async dispatch => {
  const response = await csrfFetch(`/api/friends/${friendshipId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(removeFriend(friendshipId));
  } else {
    return response;
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