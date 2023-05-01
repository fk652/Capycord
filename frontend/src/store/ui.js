const RESET_UI = 'ui/reset';
const SET_FRIEND_NAV_TAB = "ui/setFriendNavTab";
const SET_SELECTED_SERVER = "ui/setSelectedServer";
const SET_ADD_FRIEND_RESULT = "ui/setAddFriendResult";
const SET_SHOW_MEMBERS = "ui/setShowMembers";
const SET_SCROLL = "ui/setScroll";
const RESET_MESSAGE_BOX = "ui/resetMessageBox";
const SET_SHOW_SERVER_MODAL = "ui/setShowServerModal";
const SET_SERVER_FORM_PAGE = "ui/setServerFormPage";
const SET_SERVER_FORM_SLIDE = "ui/setServerFormSlide";
const SET_HOME_PAGE_LOAD = "ui/setHomePageLoad";
const SET_NEW_SERVER = "ui/setNewServer";
const SET_NEW_CHANNEL = "ui/setNewChannel";
const SET_FRIEND_SEARCH = "ui/setFriendSearch";
const SET_EDIT_MESSAGE_ID = "ui/setEditMessageId";

export const resetUi = () => ({
  type: RESET_UI
})

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

export const setServerFormSlide = (direction) => ({
  type: SET_SERVER_FORM_SLIDE,
  direction
})

export const setHomePageLoad = (toggle) => ({
  type: SET_HOME_PAGE_LOAD,
  toggle
})

export const setNewServer = (serverId) => ({
  type: SET_NEW_SERVER,
  serverId
})

export const setNewChannel = (channelId) => ({
  type: SET_NEW_CHANNEL,
  channelId
})

export const setFriendSearch = (toggle) => ({
  type: SET_FRIEND_SEARCH,
  toggle
})

export const setEditMessageId = (id) => ({
  type: SET_EDIT_MESSAGE_ID,
  id
})
// ---------------------------------------------------------

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

export const getServerSlide = (state) => {
  return state.ui.serverSlide
}

export const getHomePageLoad = (state) => {
  return state.ui.homePageLoad
}

export const getNewServer = (state) => {
  return state.ui.newServer
}

export const getNewChannel = (state) => {
  return state.ui.newChannel
}

export const getFriendSearch = (state) => {
  return state.ui.friendSearch
}

export const getEditMessageId = (state) => {
  return state.ui.editMessageId
}

const initialState = {
  selectedFriendNavTab: "friends-online",
  selectedServer: "home",
  addFriendResult: false,
  showMembers: false,
  setScroll: true,
  resetMessageBox: true,
  showServerModal: false,
  serverFormType: "start",
  serverSlide: "expand",
  homePageLoad: false,
  newServer: null,
  newChannel: null,
  friendSearch: false,
  editMessageId: null
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_UI:
      return {...initialState}
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
    case SET_SERVER_FORM_SLIDE:
      return {...state, serverSlide: action.direction}
    case SET_HOME_PAGE_LOAD:
      return {...state, homePageLoad: action.toggle}
    case SET_NEW_SERVER:
      return {...state, newServer: action.serverId}
    case SET_NEW_CHANNEL:
      return {...state, newChannel: action.channelId}
    case SET_FRIEND_SEARCH:
      return {...state, friendSearch: action.toggle}
    case SET_EDIT_MESSAGE_ID:
      return {...state, editMessageId: action.id}
    default:
      return state;
  }
}

export default uiReducer;