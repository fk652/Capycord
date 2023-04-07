import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorReducer from './errors';
import uiReducer from './ui';
import serversReducer from './servers';
import friendsReducer from './friends';
import friendRequestsReducer from './friendRequests';
import channelsReducer from './channels';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  ui: uiReducer,
  servers: serversReducer,
  friends: friendsReducer,
  friendRequests: friendRequestsReducer,
  channels: channelsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
