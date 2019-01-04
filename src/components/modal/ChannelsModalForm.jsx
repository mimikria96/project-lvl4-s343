import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import connect from '../../connect';
import { channelsSelector } from '../../selectors';

const mapStateToProps = ({ uiModalState, channels, uiChannels }) => {
  const props = {
    channels: channelsSelector(channels),
    uiChannels,
    uiModalState,
  };
  return props;
};

@reduxForm({
  form: 'channelsModal',
  enableReinitialize: true,
})
@connect(mapStateToProps)
class ChannelsModalForm extends React.Component {
  submit = (values) => {
    const { uiModalState, cancelChannelEdit, renameChannel } = this.props;
    const { id, name } = uiModalState.changedChannel;
    cancelChannelEdit(id);
    return renameChannel({ id, name: values[name] });
  }

  deleteChannel = id => () => {
    const { deleteChannel, cancelChannelEdit } = this.props;
    deleteChannel(id);
    cancelChannelEdit(id);
  }

  handleCancel = id => () => {
    const { cancelChannelEdit, reset } = this.props;
    cancelChannelEdit(id);
    reset();
  }

  setEditingChannel = ({ id, name }) => () => {
    const { setEditingChannel } = this.props;
    setEditingChannel({ id, name });
  }

  setEditingMode = id => () => {
    const { setEditingModalFormMode } = this.props;
    setEditingModalFormMode(id);
  }

  renderEditingChannel(el) {
    const { uiChannels, error } = this.props;
    if (!uiChannels[el.id].editing) {
      return null;
    }
    return (
      <div>
        <Field name={el.name} onFocus={this.setEditingChannel({ id: el.id, name: el.name })} required component="input" type="text" />
        {error}
        <ButtonToolbar>
          <Button variant="primary" size="sm" type="submit">
         edit
          </Button>
          {el.removable && <Button variant="danger" size="sm" onClick={this.deleteChannel(el.id)}>delete</Button>}
          <Button variant="warning" size="sm" onClick={this.handleCancel(el.id)}>
         cancel
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

  renderChannelButton(el) {
    const { uiChannels, uiModalState } = this.props;
    if (uiChannels[el.id].editing) {
      return null;
    }
    return (
      <div>
        <span className="mr-1">{el.name}</span>
        <Button variant="primary" size="sm" disabled={uiModalState.formMode !== 'reading'} onClick={this.setEditingMode(el.id)}>
       settings
        </Button>
      </div>
    );
  }

  render() {
    const { handleSubmit, channels } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <ul className="list-group">
          {channels.map(el => (
            <li key={el.id} className="list-group-item">
              {this.renderEditingChannel(el)}
              {this.renderChannelButton(el)}
            </li>))}
        </ul>
      </form>
    );
  }
}

export default ChannelsModalForm;
