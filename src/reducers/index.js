import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
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
  [actions.addMessage](state, { payload: { id, attributes } }) {
    return { ...state, [id]: { ...attributes } };
  },
  [actions.toggleChannelSuccess](state, { payload: { data } }) {
    return data.reduce((acc, m) => ({ ...acc, [m.id]: m.attributes }), {});
  },
  [actions.channelDelete](state, { payload: { id } }) {
    return _.omitBy(state, m => m.id === id);
  },
}, {});

const channels = handleActions({
  [actions.channelRename](state, { payload: { id, channel } }) {
    return { ...state, [id]: channel };
  },
  [actions.channelDelete](state, { payload: { id } }) {
    return _.omit(state, id);
  },
  [actions.channelAdd](state, { payload: { id, channel } }) {
    return { ...state, [id]: channel };
  },
}, {});


export default combineReducers({
  form: formReducer,
  messages,
  channels,
  currentChannelId,
  appConnectionState,
  chatToggleState,
  channelsModalState,
});
