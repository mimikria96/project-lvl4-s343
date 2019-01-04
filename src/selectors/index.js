import { createSelector } from 'reselect';


export const getMessages = messages => messages;
export const messagesSelector = createSelector(
  getMessages,
  messages => Object.values(messages),
);

export const getChannels = channels => channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);
