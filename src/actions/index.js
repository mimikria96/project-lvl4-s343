import axios from 'axios';

import { createAction } from 'redux-actions';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const toggleChannelRequest = createAction('CHANNEL_TOGGLE_REQUEST');
export const toggleChannelSuccess = createAction('CHANNEL_TOGGLE_SUCCESS');
export const toggleChannelFailure = createAction('CHANNEL_TOGGLE_FAILURE');

export const appNormalConnection = createAction('APP_CONNECTION_NORMAL');

export const deliteChannel = createAction('CHANNEL_DELETE');
export const addMessage = createAction('MESSAGE_ADD');

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
  dispatch(sendMessageRequest());
  try {
    await axios.post(`/api/v1/channels/${channelId}/messages`, { data: { attributes: message } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};
