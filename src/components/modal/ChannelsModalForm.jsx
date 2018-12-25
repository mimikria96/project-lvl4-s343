import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import UseChannels from '../../connects/connect';

@UseChannels
class ChannelsModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: props.channels.reduce((acc, el) => ({ ...acc, [el.id]: { editing: false } }), {}),
      changedChannel: '',
      formMode: 'reading',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.channels !== nextProps.channels) {
      this.setState({ channels: nextProps.channels.reduce((acc, el) => ({ ...acc, [el.id]: { editing: false } }), {}) });
    }
    if (this.props.initialValues !== nextProps.initialValues) {
      console.log(nextProps.initialValues);
    }
  }

  submit = (values) => {
    const { id, name } = this.state.changedChannel;
    this.handleCancel(id)();
    return this.props.renameChannel({ id, name: values[name] });
  }

  deleteChannel = id => () => this.props.deleteChannel(id);

  handleCancel = id => () => {
    const { channels } = this.state;
    this.setState({
      channels: { ...channels, [id]: { editing: false } },
      formMode: 'reading',
      changedChannel: '',
    });
    this.props.reset();
  }

  setChangedChannel = ({ id, name }) => () => {
    this.setState({ changedChannel: { id, name } });
  }

  setEditingMod = id => () => {
    const { channels } = this.state;
    this.setState({
      channels: { ...channels, [id]: { editing: true } },
      formMode: 'editing',
    });
  }

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <ul className="list-group">
          {this.props.channels.map(el => (
            <li key={el.id} className="list-group-item">
              {this.state.channels[el.id].editing ? (
                <div>
                  <Field name={el.name} onFocus={this.setChangedChannel({ id: el.id, name: el.name })} required component="input" type="text" />
                  {error}
                  <ButtonToolbar>
                    <Button variant="primary" size="sm" type="submit">
                     edit
                    </Button>
                    {!el.removable ? ''
                      : <Button variant="danger" size="sm" onClick={this.deleteChannel(el.id)}>delete</Button>
                   }
                    <Button variant="warning" size="sm" onClick={this.handleCancel(el.id)}>
                    cancel
                    </Button>
                  </ButtonToolbar>
                </div>
              ) : (
                <div>
                  <span className="mr-1">{el.name}</span>
                  <Button variant="primary" size="sm" disabled={this.state.formMode !== 'reading'} onClick={this.setEditingMod(el.id)}>
                  settings
                  </Button>
                </div>
              )
              }
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default reduxForm({
  form: 'channelsModal',
  enableReinitialize: true,
})(ChannelsModalForm);
