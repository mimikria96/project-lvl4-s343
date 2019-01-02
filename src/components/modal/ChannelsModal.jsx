import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import connect from '../../connect';
import NewChannelForm from './NewChannelForm';
import ChannelsModalForm from './ChannelsModalForm';
import { channelsSelector } from '../../selectors';

const mapStateToProps = ({ channels, channelsModalState, appConnectionState }) => {
  const props = {
    channels: channelsSelector(channels),
    channelsModalState,
    appConnectionState,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsModal extends React.Component {
  state = { addChannelForm: 'hide' };

  newChannelSubmit = (values) => {
    this.props.addNewChannel(values);
    this.hideForm();
  }

  showForm = () => {
    this.setState({ addChannelForm: 'show' });
  }

  hideForm = () => {
    this.setState({ addChannelForm: 'hide' });
  }

  modalHide = () => {
    this.props.channelsModalHide();
  }

  renderChannelForm() {
    if (this.state.addChannelForm !== 'show') {
      return null;
    }
    return (
      <div className="d-flex">
        <NewChannelForm onSubmit={this.newChannelSubmit} />
        <Button variant="warning" onClick={this.hideForm}>
       cancel
        </Button>
      </div>);
  }

  renderAddButton() {
    if (this.state.addChannelForm !== 'hide') {
      return null;
    }
    return (
      <Button variant="success" className="mb-1" onClick={this.showForm}>
       new channel +
      </Button>);
  }

  renderNerworkError() {
    if (this.props.appConnectionState !== 'failed') {
      return null;
    }
    return <div className="text-grey text-center">Try your network connection</div>;
  }

  render() {
    const initialValues = this.props.channels.reduce((acc, el) => ({ ...acc, [el.name]: el.name }), {});
    return (
      <Modal show={this.props.channelsModalState === 'show'} onHide={this.modalHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            Channels
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderNerworkError()}
          {this.renderAddButton()}
          {this.renderChannelForm()}
          <ChannelsModalForm initialValues={initialValues} />
        </Modal.Body>
      </Modal>
    );
  }
}
export default ChannelsModal;
