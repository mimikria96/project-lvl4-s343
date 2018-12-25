import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';

class NewChannelForm extends React.Component {
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {error}
        <Field name="name" component="input" type="text" />
        <Button variant="primary" className="ml-1" type="submit" disabled={submitting}>
      add
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newChannelForm',
})(NewChannelForm);
