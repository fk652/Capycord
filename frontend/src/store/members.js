import csrfFetch from "./csrf";
import { addServer } from "./servers";
import { setNewServer } from "./ui";

const RESET_MEMBERS = 'members/resetMembers';
const SET_MEMBERS = 'members/setMembers';
const ADD_MEMBER = 'members/addMember';
const REMOVE_MEMBER = 'members/removeMember';

export const resetMembers = () => ({
  type: RESET_MEMBERS
})

const setMembers = (members) => ({
  type: SET_MEMBERS,
  members
})

export const addMember = (member) => ({
  type: ADD_MEMBER,
  member
})

export const getMembers = (state) => {
  return state.members 
    ? Object.values(state.members).sort((a, b) => a.username > b.username ? 1 : -1)
    : [];
}

export const getMembersObject = (state) => {
  return state.members ? state.members : {};
}

export const getMember = (id) => (state) => {
  return state.members ? state.members[id] : null;
}

export const fetchMembers = (serverId) => async dispatch => {
  const response = await csrfFetch(`/api/servers/${serverId}/memberships`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setMembers(data.members));
  }
}

export const createMember = (memberData) => async dispatch => {
  const response = await csrfFetch(`/api/memberships`, {
    method: "POST",
    body: JSON.stringify(memberData)
  });

  const data = await response.json();
  dispatch(addServer(data.server));
  dispatch(setNewServer(data.server.id));
  return response;
}

export const updateMember = (memberData) => async dispatch => {

}

export const deleteMember = (memberId) => async dispatch => {

}

const initialState = null;

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_MEMBERS:
      return initialState;
    case SET_MEMBERS:
      return {...action.members};
    case ADD_MEMBER:
      return {...state, [action.member.id]: action.member}
    default:
      return state;
  }
}

export default membersReducer;