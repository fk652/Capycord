const RESET_UI = 'ui/reset';
const SET_UNAUTHORIZED = "ui/setUnauthorized";
const SET_HOME_REDIRECT = "ui/setHomeRedirect";
const SET_FRIEND_NAV_TAB = "ui/setFriendNavTab";
const SET_SELECTED_SERVER = "ui/setSelectedServer";
const SET_ADD_FRIEND_RESULT = "ui/setAddFriendResult";
const SET_SHOW_MEMBERS = "ui/setShowMembers";
const SET_SCROLL = "ui/setScroll";
const SET_SHOW_SERVER_MODAL = "ui/setShowServerModal";
const SET_SERVER_FORM_PAGE = "ui/setServerFormPage";
const SET_SERVER_FORM_SLIDE = "ui/setServerFormSlide";
const SET_ANIMATE_OFFLINE_FRIENDS = "ui/setAnimateOfflineFriends";
const SET_NEW_SERVER = "ui/setNewServer";
const SET_NEW_CHANNEL = "ui/setNewChannel";
const SET_FRIEND_SEARCH = "ui/setFriendSearch";
const SET_EDIT_MESSAGE_ID = "ui/setEditMessageId";
const SET_SHOW_SERVER_ADMIN_MODAL = "ui/setShowServerAdminModal";
const SET_SERVER_ADMIN_TAB = "ui/setSelectedServerAdminTab";
const SET_LEAVE_SERVER_MODAL = "ui/setLeaveServerModal";
const SET_CREATE_CHANNEL_MODAL = "ui/setCreateChannelModal";
const SET_DELETED_SERVER_ID = "ui/setDeletedServerId";
const SET_QUICK_DELETE = "ui/setQuickDelete";

export const resetUi = () => ({
  type: RESET_UI
})

export const setUnauthorized = (toggle) => ({
  type: SET_UNAUTHORIZED,
  toggle
})

export const setHomeRedirect = (toggle) => ({
  type: SET_HOME_REDIRECT,
  toggle
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

export const setAnimateOfflineFriends = (toggle) => ({
  type: SET_ANIMATE_OFFLINE_FRIENDS,
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

export const setShowServerAdminModal = (toggle) => ({
  type: SET_SHOW_SERVER_ADMIN_MODAL,
  toggle
})

export const setServerAdminTab = (tab) => ({
  type: SET_SERVER_ADMIN_TAB,
  tab
})

export const setLeaveServerModal = (toggle) => ({
  type: SET_LEAVE_SERVER_MODAL,
  toggle
})

export const setCreateChannelModal = (toggle) => ({
  type: SET_CREATE_CHANNEL_MODAL,
  toggle
})

export const setDeletedServerId = (id) => ({
  type: SET_DELETED_SERVER_ID,
  id
})

export const setQuickDelete = (toggle) => ({
  type: SET_QUICK_DELETE,
  toggle
})
// ---------------------------------------------------------

export const getUnauthorized = (state) => {
  return state.ui.unauthorized
}

export const getHomeRedirect = (state) => {
  return state.ui.homeRedirect
}

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

export const getShowServerModal = (state) => {
  return state.ui.showServerModal
}

export const getServerFormType = (state) => {
  return state.ui.serverFormType
}

export const getServerSlide = (state) => {
  return state.ui.serverSlide
}

export const getAnimateOfflineFriends = (state) => {
  return state.ui.animateOfflineFriends
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

export const getShowServerAdminModal = (state) => {
  return state.ui.showServerAdminModal
}

export const getServerAdminTab = (state) => {
  return state.ui.serverAdminTab
}

export const getLeaveServerModal = (state) => {
  return state.ui.showLeaveServerModal
}

export const getCreateChannelModal = (state) => {
  return state.ui.showCreateChannelModal
}

export const getDeletedServerId = (state) => {
  return state.ui.deletedServerId
}

export const getQuickDelete = (state) => {
  return state.ui.quickDelete
}

const initialState = {
  unauthorized: false,
  homeRedirect: false,
  selectedFriendNavTab: "friends-online",
  selectedServer: "home",
  addFriendResult: false,
  showMembers: false,
  setScroll: true,
  showServerModal: false,
  serverFormType: "start",
  serverSlide: "expand",
  animateOfflineFriends: false,
  newServer: null,
  newChannel: null,
  friendSearch: false,
  editMessageId: null,
  showServerAdminModal: false,
  serverAdminTab: "Overview",
  showLeaveServerModal: false,
  showCreateChannelModal: false,
  deletedServerId: null,
  quickDelete: false
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_UI:
      return {...initialState}
    case SET_UNAUTHORIZED:
      return {...state, unauthorized: action.toggle}
    case SET_HOME_REDIRECT:
      return {...state, homeRedirect: action.toggle}
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
    case SET_SERVER_FORM_PAGE:
      return {...state, serverFormType: action.formType}
    case SET_SHOW_SERVER_MODAL:
      return {...state, showServerModal: action.toggle}
    case SET_SERVER_FORM_SLIDE:
      return {...state, serverSlide: action.direction}
    case SET_ANIMATE_OFFLINE_FRIENDS:
      return {...state, animateOfflineFriends: action.toggle}
    case SET_NEW_SERVER:
      return {...state, newServer: action.serverId}
    case SET_NEW_CHANNEL:
      return {...state, newChannel: action.channelId}
    case SET_FRIEND_SEARCH:
      return {...state, friendSearch: action.toggle}
    case SET_EDIT_MESSAGE_ID:
      return {...state, editMessageId: action.id}
    case SET_SHOW_SERVER_ADMIN_MODAL:
      return {...state, showServerAdminModal: action.toggle}
    case SET_SERVER_ADMIN_TAB: 
      return {...state, serverAdminTab: action.tab}
    case SET_LEAVE_SERVER_MODAL:
      return {...state, showLeaveServerModal: action.toggle}
    case SET_CREATE_CHANNEL_MODAL:
      return {...state, showCreateChannelModal: action.toggle}
    case SET_DELETED_SERVER_ID:
      return {...state, deletedServerId: action.id}
    case SET_QUICK_DELETE:
      return {...state, quickDelete: action.toggle}
    default:
      return state;
  }
}

export default uiReducer;