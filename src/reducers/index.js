import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


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

const currentChannelId = handleActions({
  [actions.toggleChannelSuccess](state, { payload: { channelId } }) {
    return channelId;
  },
}, '');

const channelsModalState = handleActions({
  [actions.channelsModalShow]() {
    return 'show';
  },
  [actions.channelsModalHide]() {
    return 'hide';
  },
}, 'hide');

const appConnectionState = handleActions({
  [actions.toggleChannelFailure]() {
    return 'failed';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.deleteChannelFailure]() {
    return 'failed';
  },
  [actions.channelRenameFailure]() {
    return 'failed';
  },
  [actions.toggleChannelSuccess]() {
    return 'normal';
  },
  [actions.sendMessageSuccess]() {
    return 'normal';
  },
  [actions.addChannelSuccess]() {
    return 'normal';
  },
  [actions.deleteChannelSuccess]() {
    return 'normal';
  },
  [actions.channelRenameSuccess]() {
    return 'normal';
  },
}, 'normal');


const messages = handleActions({
  [actions.addMessage](state, { payload: { attributes } }) {
    return [...state, { ...attributes }];
  },
  [actions.toggleChannelSuccess](state, { payload: { attributes } }) {
    return attributes.map(m => m.attributes);
  },
  [actions.channelDelete](state, { payload: { id } }) {
    return state.filter(m => m.id !== id);
  },
}, []);

const channels = handleActions({
  [actions.channelRename](state, { payload: { id, channel } }) {
    const newState = state.map(el => (el.id === id ? channel : el));
    return newState;
  },
  [actions.channelDelete](state, { payload: { id } }) {
    return state.filter(c => c.id !== id);
  },
  [actions.channelAdd](state, { payload }) {
    return [...state, payload];
  },
}, []);


export default combineReducers({
  form: formReducer,
  messages,
  channels,
  currentChannelId,
  appConnectionState,
  chatToggleState,
  channelsModalState,
});
