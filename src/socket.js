import io from 'socket.io-client';
import * as actions from './actions';

export default function (store) {
  const socket = io();
  /* socket.on('open', () => {
    console.log('a user connected');
    store.dispatch(actions.appNormalConnection());});

    не получается найти нормальны метод реконнекта,
     получается при отсутствии соединения ни on.error ни on.close не происходит?
*/
  socket.on('newMessage', (message) => {
    store.dispatch(actions.addMessage(message.data));
  });
}
