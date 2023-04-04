const SET_FRIEND_NAV_TAB = "ui/setFriendNavTab";
const SET_SELECTED_SERVER = "ui/setSelectedServer";
const RESET_UI = 'ui/reset';

export const setFriendNav = (selectedTab) => ({
  type: SET_FRIEND_NAV_TAB,
  selectedTab
})

export const setSelectedServer = (selectedServer) => ({
  type: SET_SELECTED_SERVER,
  selectedServer
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

const initialState = {
  selectedFriendNavTab: "friends-online",
  selectedServer: "home" // home
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIEND_NAV_TAB:
      return {...state, selectedFriendNavTab: action.selectedTab}
    case SET_SELECTED_SERVER:
      return {...state, selectedServer: action.selectedServer}
    case RESET_UI:
      return {...initialState}
    default:
      return state;
  }
}

export default uiReducer;