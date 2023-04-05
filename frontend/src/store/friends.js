import csrfFetch from "./csrf";

const RESET_FRIENDS = 'friends/resetFriends';
const SET_FRIENDS = 'friends/setFriends';

export const resetFriends = () => ({
  type: RESET_FRIENDS
})

const setFriends = (friends) => ({
  type: SET_FRIENDS,
  friends
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

const initialState = {}

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FRIENDS:
      return initialState
    case SET_FRIENDS:
      return {...action.friends}
    default:
      return state;
  }
}

export default friendsReducer;