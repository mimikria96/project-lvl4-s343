import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};
@reduxForm({
  form: 'newMessage',
})
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  submit = (values) => {
    const {
      reset, sendMessage, currentChannelId, userName,
    } = this.props;
    reset();
    return sendMessage({ channelId: currentChannelId, message: { userName, ...values } });
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

export default NewMessageForm;
