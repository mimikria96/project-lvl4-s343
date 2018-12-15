import React from 'react';
import NewMessageForm from '../containers/NewMessageForm';
import MessagesList from '../containers/MessagesList';
import ChannelList from '../containers/ChannelList';

const App = () => (
  <div className="d-flex chat-conteiner">
    <ChannelList />
    <div className="flex-grow-1 d-flex flex-column justify-content-end">
      <MessagesList />
      <NewMessageForm />
    </div>
  </div>
);
export default App;
