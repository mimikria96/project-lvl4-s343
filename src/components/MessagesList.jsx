import React from 'react';
import cn from 'classnames';
// import UseMessages from '../connects/messages';
import connect from '../connects/connect';

@connect
class MessagesList extends React.Component {
  render() {
    const chatClassList = cn({
      chat_space: true,
      'flex-grow-1 bg-light position-relative pl-2': true,
      [`chat-${this.props.chatToggleState}`]: true,
    });
    return (
      <div className={chatClassList}>
        {this.props.appConnectionState === 'failed'
          ? <div className="position-absolute bg-warning connect-warning">Try your network connection</div>
          : ''}
        {this.props.messages.map(el => <div key={el.id}>{el.userName}: <span>{el.text}</span></div>)}
      </div>
    );
  }
}

export default MessagesList;
