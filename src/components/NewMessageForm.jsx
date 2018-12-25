import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Cookeis from 'js-cookie';
import connect from '../connects/connect';

@connect

class NewMessageForm extends React.Component {
  state = { userName: Cookeis.get('UserName') };

  submit = (values) => {
    this.props.reset();
    return this.props.sendMessage({ channelId: this.props.currentChannelId, message: { userName: this.state.userName, ...values } });
  };

  render() {
    const {
      handleSubmit, submitting, error,
    } = this.props;

    return (
      <form className="ml-3" onSubmit={handleSubmit(this.submit)}>
        {error}
        <div className="form-container d-flex">
          <div className="flex-grow-1">
            <Field name="text" className="form-control" required component="input" type="text" />
          </div>
          <button type="submit" disabled={submitting} className="btn ml-3 btn-primary btn-sm">Send</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
