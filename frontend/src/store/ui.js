const SET_FRIEND_NAV_TAB = "ui/setNavTab";
const RESET_UI = 'ui/reset';

export const setFriendNav = (selectedTab) => ({
  type: SET_FRIEND_NAV_TAB,
  selectedTab
})

export const resetUi = () => ({
  type: RESET_UI
})

export const getSelectedFriendNavTab = (state) => {
  return state.ui.selectedFriendNavTab;
}

const initialState = {
  selectedFriendNavTab: "friends-online"
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIEND_NAV_TAB:
      return {...state, selectedFriendNavTab: action.selectedTab}
    case RESET_UI:
      return {...initialState}
    default:
      return state;
  }
}

export default uiReducer;