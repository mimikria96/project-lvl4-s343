import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, ButtonToolbar } from 'react-bootstrap';
import connect from '../../connects/connect';

const mapStateToProps = ({ channels }) => {
  const props = {
    channels,
  };
  return props;
};

@reduxForm({
  form: 'channelsModal',
  enableReinitialize: true,
})
@connect(mapStateToProps)
class ChannelsModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: _.mapValues(props.channels, () => ({ editing: false })),
      changedChannel: '',
      formMode: 'reading',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.channels !== nextProps.channels) {
      this.setState({ channels: _.mapValues(nextProps.channels, el => ({ ...el, editing: false })) });
    }
  }

  submit = (values) => {
    const { id, name } = this.state.changedChannel;
    this.handleCancel(id)();
    return this.props.renameChannel({ id, name: values[name] });
  }

  deleteChannel = id => () => {
    this.props.deleteChannel(id);
    this.handleCancel(id)();
  }

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
          {Object.values(this.props.channels).map(el => (
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

export default ChannelsModalForm;
