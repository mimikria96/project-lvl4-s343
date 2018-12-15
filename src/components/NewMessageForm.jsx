import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Cookeis from 'js-cookie';

class NewMessageForm extends React.Component {
  state = { userName: Cookeis.get('UserName') };

  submit = (values) => {
    this.props.sendMessage({ channelId: this.props.currentChannelId, message: { userName: this.state.userName, ...values } });
    this.props.reset();
  };

  render() {
    const { messageCreatingState, appLoadingState } = this.props;
    const disabled = messageCreatingState === 'requested';
    return (
      <form className="ml-3" onSubmit={this.props.handleSubmit(this.submit)}>
        {appLoadingState === 'failed' && messageCreatingState === 'dailed' ? <p className="text-muted">Try your network connection</p> : ''}
        <div className="form-container d-flex">
          <div className="flex-grow-1">
            <Field name="text" className="form-control" required component="input" type="text" />
          </div>
          <button type="submit" disabled={disabled} className="btn ml-3 btn-primary btn-sm">Send</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
