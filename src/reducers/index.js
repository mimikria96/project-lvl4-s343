import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const messageCreatingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.sendMessageSuccess]() {
    return 'succeed';
  },
}, 'none');

const chatToggleState = handleActions({
  [actions.toggleChannelRequest]() {
    return 'loading';
  },
  [actions.toggleChannelFailure]() {
    return 'failed';
  },
  [actions.toggleChannelSuccess]() {
    return 'succeed';
  },
}, '');

const appConnectionState = handleActions({
  [actions.appNormalConnection]() {
    return 'normal';
  },
  [actions.toggleChannelFailure]() {
    return 'failed';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.toggleChannelSuccess]() {
    return 'succeed';
  },
  [actions.sendMessageSuccess]() {
    return 'succeed';
  },
}, '');

const messages = handleActions({
  [actions.addMessage](state, { payload: { attributes } }) {
    return [...state, { ...attributes }];
  },
  [actions.toggleChannelSuccess](state, { payload: { attributes } }) {
    return attributes.map(m => m.attributes);
  },
}, []);
const channels = handleActions({
  [actions.deliteChannel]() {
    return [];
  },
}, []);

const currentChannelId = handleActions({
  [actions.toggleChannelSuccess](state, { payload: { channelId } }) {
    return channelId;
  },
}, '');


export default combineReducers({
  form: formReducer,
  messages,
  channels,
  messageCreatingState,
  currentChannelId,
  appConnectionState,
  chatToggleState,
});
