import { resetChannels } from './channels';
import csrfFetch from './csrf';
import { removeErrors } from './errors';
import { resetFriendRequests } from './friendRequests';
import { resetFriends } from './friends';
import { resetMembers } from './members';
import { resetMessages } from './messages';
import { resetServers } from './servers';
import { resetUi } from './ui';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  user 
    ? sessionStorage.setItem("currentUser", JSON.stringify(user))
    : sessionStorage.removeItem("currentUser")
}

export const login = ({ email, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password
    })
  });

  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });

  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  dispatch(removeErrors());
  dispatch(resetUi());
  dispatch(resetServers());
  dispatch(resetFriends());
  dispatch(resetFriendRequests());
  dispatch(resetChannels());
  dispatch(resetMessages());
  dispatch(resetMembers());
  return response;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");

  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;