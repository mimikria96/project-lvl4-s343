import React from 'react';
import NewMessageForm from './NewMessageForm';
import MessagesList from './MessagesList';
import ChannelList from './ChannelList';

const App = () => (
  <div className="d-flex h-100 chat-container">
    <ChannelList />
    <div className="flex-grow-1 d-flex flex-column justify-content-end">
      <MessagesList />
      <NewMessageForm />
    </div>
  </div>
);

export default App;
