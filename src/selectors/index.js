import { createSelector } from 'reselect';

export const getMessages = state => state.messages;
export const tasksSelector = createSelector(
  getMessages,
  messages => Object.values(messages),
);
export const generalMessagesSelector = createSelector(
  tasksSelector,
  messages => messages.filter(m => m.channel === 'general'),
);
export const randomMessagesSelector = createSelector(
  tasksSelector,
  messages => messages.filter(m => m.channel === 'random'),
);
