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
    return _.omit(state, id);
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

const uiModalState = handleActions({
  [actions.cancelChannelEdit]() {
    return { changedChannel: '', formMode: 'reading' };
  },
  [actions.setEditingChannel](state, { payload: { id, name } }) {
    return { ...state, changedChannel: { id, name } };
  },
  [actions.setEditingModalFormMode](state) {
    return { ...state, formMode: 'editing' };
  },
  [actions.channelDelete](state, { payload: { id } }) {
    return _.omit(state, id);
  },
}, { changedChannel: '', formMode: 'reading' });

const uiChannels = handleActions({
  [actions.cancelChannelEdit](state, { payload }) {
    return { ...state, [payload]: { editing: false } };
  },
  [actions.setEditingModalFormMode](state, { payload }) {
    return { ...state, [payload]: { editing: true } };
  },
  [actions.channelAdd](state, { payload: { id } }) {
    return { ...state, [id]: { editing: false } };
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
  uiModalState,
  uiChannels,
});
