import io from 'socket.io-client';
import * as actions from './actions';

export default function (store) {
  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(actions.addMessage(message.data));
  })
    .on('renameChannel', ({ data: { id, attributes } }) => {
      store.dispatch(actions.channelRename({ id, channel: attributes }));
    })
    .on('removeChannel', ({ data: { id } }) => {
      store.dispatch(actions.channelDelete({ id }));
    })
    .on('newChannel', ({ data: { attributes } }) => {
      store.dispatch(actions.channelAdd(attributes));
    });
}
