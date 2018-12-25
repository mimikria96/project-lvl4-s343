import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { createAction } from 'redux-actions';

export const toggleChannelRequest = createAction('CHANNEL_TOGGLE_REQUEST');
export const toggleChannelSuccess = createAction('CHANNEL_TOGGLE_SUCCESS');
export const toggleChannelFailure = createAction('CHANNEL_TOGGLE_FAILURE');

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const channelRenameSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const channelRenameFailure = createAction('CHANNEL_RENAME_FAILURE');

export const channelsModalShow = createAction('CHANNELS_MODAL_SHOW');
export const channelsModalHide = createAction('CHANNELS_MODAL_HIDE');

export const channelRename = createAction('CHANNEL_RENAME');
export const channelDelete = createAction('CHANNEL_DELETE');
export const channelAdd = createAction('CHANNEL_ADD');

export const appNormalConnection = createAction('APP_CONNECTION_NORMAL');

export const addMessage = createAction('MESSAGE_ADD');
export const sendMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addNewChannel = ({ name }) => async (dispatch) => {
  try {
    await axios.post('/api/v1/channels', { data: { attributes: { name } } });
    dispatch(addChannelSuccess());
  } catch (e) {
    dispatch(addChannelFailure());
  }
};

export const deleteChannel = id => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/channels/${id}`, { params: { id } });
    dispatch(deleteChannelSuccess());
  } catch {
    dispatch(deleteChannelFailure());
  }
};

export const renameChannel = ({ id, name }) => async (dispatch) => {
  try {
    await axios.patch(`/api/v1/channels/${id}`, { params: { id }, data: { attributes: { name } } });
    dispatch(channelRenameSuccess());
  } catch (e) {
    dispatch(channelRenameFailure());
    throw new SubmissionError({
      _error: 'You are not connect, try again!',
    });
  }
};

export const toggleChannel = ({ channelId }) => async (dispatch) => {
  dispatch(toggleChannelRequest());
  try {
    const response = await axios.get(`/api/v1/channels/${channelId}/messages`, { params: { channelId } });
    dispatch(toggleChannelSuccess({ attributes: response.data, channelId }));
  } catch (e) {
    dispatch(toggleChannelFailure());
  }
};

export const sendMessage = ({ channelId, message }) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/channels/${channelId}/messages`, { data: { attributes: message } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    throw new SubmissionError({
      _error: 'You are not connect, try later!',
    });
  }
};
