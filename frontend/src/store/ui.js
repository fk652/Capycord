const SET_FRIEND_NAV_TAB = "ui/setFriendNavTab";
const SET_SELECTED_SERVER = "ui/setSelectedServer";
const SET_ADD_FRIEND_RESULT = "ui/setAddFriendResult";
const RESET_UI = 'ui/reset';

export const setFriendNav = (selectedTab) => ({
  type: SET_FRIEND_NAV_TAB,
  selectedTab
})

export const setSelectedServer = (selectedServer) => ({
  type: SET_SELECTED_SERVER,
  selectedServer
})

export const setAddFriendResult = (result) => ({
  type: SET_ADD_FRIEND_RESULT,
  result
})

export const resetUi = () => ({
  type: RESET_UI
})

export const getSelectedFriendNavTab = (state) => {
  return state.ui.selectedFriendNavTab;
}

export const getSelectedServer = (state) => {
  return state.ui.selectedServer;
}

export const getAddFriendResult = (state) => {
  return state.ui.addFriendResult
}

export const getChannelReset = (state) => {
  return state.ui.channelReset
}

const initialState = {
  selectedFriendNavTab: "friends-online",
  selectedServer: "home",
  addFriendResult: false
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIEND_NAV_TAB:
      return {...state, selectedFriendNavTab: action.selectedTab}
    case SET_SELECTED_SERVER:
      return {...state, selectedServer: action.selectedServer}
    case SET_ADD_FRIEND_RESULT:
      return {...state, addFriendResult: action.result}
    case RESET_UI:
      return {...initialState}
    default:
      return state;
  }
}

export default uiReducer;