const SET_FRIEND_NAV_TAB = "ui/setFriendNavTab";
const SET_SELECTED_SERVER = "ui/setSelectedServer";
const SET_ADD_FRIEND_RESULT = "ui/setAddFriendResult";
const SET_SHOW_MEMBERS = "ui/setShowMembers";
const SET_SCROLL = "ui/setScroll";
const RESET_MESSAGE_BOX = "ui/resetMessageBox";
const SET_SHOW_SERVER_MODAL = "ui/setShowServerModal";
const SET_SERVER_FORM_PAGE = "ui/setServerFormPage";
const RESET_UI = 'ui/reset';

export const setFriendNav = (selectedTab) => ({
  type: SET_FRIEND_NAV_TAB,
  selectedTab
})

export const setSelectedServer = (selectedServer) => ({
  type: SET_SELECTED_SERVER,
  selectedServer
})

export const setShowMembers = (toggle) => ({
  type: SET_SHOW_MEMBERS,
  toggle
})

export const setAddFriendResult = (result) => ({
  type: SET_ADD_FRIEND_RESULT,
  result
})

export const setScroll = (toggle) => ({
  type: SET_SCROLL,
  toggle
})

export const resetMessageBox = (toggle) => ({
  type: RESET_MESSAGE_BOX,
  toggle
})

export const setShowServerModal = (toggle) => ({
  type: SET_SHOW_SERVER_MODAL,
  toggle
})

export const setServerFormPage = (formType) => ({
  type: SET_SERVER_FORM_PAGE,
  formType
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

export const getShowMembersToggle = (state) => {
  return state.ui.showMembers
}

export const getSetScroll = (state) => {
  return state.ui.setScroll
}

export const getResetMessageBox = (state) => {
  return state.ui.resetMessageBox
}

export const getShowServerModal = (state) => {
  return state.ui.showServerModal
}

export const getServerFormType = (state) => {
  return state.ui.serverFormType
}

const initialState = {
  selectedFriendNavTab: "friends-online",
  selectedServer: "home",
  addFriendResult: false,
  showMembers: false,
  setScroll: true,
  resetMessageBox: true,
  showServerModal: false,
  serverFormType: "start"
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIEND_NAV_TAB:
      return {...state, selectedFriendNavTab: action.selectedTab}
    case SET_SELECTED_SERVER:
      return {...state, selectedServer: action.selectedServer}
    case SET_ADD_FRIEND_RESULT:
      return {...state, addFriendResult: action.result}
    case SET_SHOW_MEMBERS:
      return {...state, showMembers: action.toggle}
    case SET_SCROLL:
      return {...state, setScroll: action.toggle}
    case RESET_MESSAGE_BOX:
      return {...state, resetMessageBox: action.toggle}
    case SET_SERVER_FORM_PAGE:
      return {...state, serverFormType: action.formType}
    case SET_SHOW_SERVER_MODAL:
      return {...state, showServerModal: action.toggle}
    case RESET_UI:
      return {...initialState}
    default:
      return state;
  }
}

export default uiReducer;