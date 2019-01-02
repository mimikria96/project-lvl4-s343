import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import { messagesSelector } from '../selectors';

const mapStateToProps = ({ messages, appConnectionState }) => {
  const props = {
    messages: messagesSelector(messages),
    appConnectionState,
  };
  return props;
};

@connect(mapStateToProps)
class MessagesList extends React.Component {
  renderConnectionError() {
    if (this.props.connectionState !== 'failed') {
      return null;
    }
    return (
      <div className="position-absolute w-100">
        <div className="w-25 text-center mx-auto bg-warning connect-warning">Try your network connection</div>
      </div>);
  }

  render() {
    const chatClassList = cn({
      chat_space: true,
      'flex-grow-1 bg-light position-relative pl-2': true,
      [`chat-${this.props.chatToggleState}`]: true,
    });
    return (
      <div className={chatClassList}>
        {this.renderConnectionError()}
        {this.props.messages.map(el => <div key={el.id}>{el.userName}: <span>{el.text}</span></div>)}
      </div>
    );
  }
}

export default MessagesList;
