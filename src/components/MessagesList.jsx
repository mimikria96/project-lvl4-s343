import React from 'react';
import cn from 'classnames';

const MessagesList = (props) => {
  const chatClassList = cn({
    chat_space: true,
    'flex-grow-1 bg-light position-relative pl-2': true,
    [`chat-${props.chatToggleState}`]: true,
  });
  return (
    <div className={chatClassList}>
      {props.appConnectionState === 'failed' ? <div className="position-absolute bg-warning connect-warning">Try your network connection</div> : ''}
      {props.messages.map(el => <div key={el.id}>{el.userName}: <span>{el.text}</span></div>)}
    </div>
  );
};

export default MessagesList;
