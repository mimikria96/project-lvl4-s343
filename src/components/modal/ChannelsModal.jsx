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
    const { addNewChannel } = this.props;
    addNewChannel(values);
    this.hideForm();
  }

  showForm = () => {
    this.setState({ addChannelForm: 'show' });
  }

  hideForm = () => {
    this.setState({ addChannelForm: 'hide' });
  }

  modalHide = () => {
    const { channelsModalHide } = this.props;
    channelsModalHide();
  }

  renderChannelForm() {
    const { addChannelForm } = this.state;
    if (addChannelForm !== 'show') {
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
    const { addChannelForm } = this.state;
    if (addChannelForm !== 'hide') {
      return null;
    }
    return (
      <Button variant="success" className="mb-1" onClick={this.showForm}>
       new channel +
      </Button>);
  }

  renderNerworkError() {
    const { appConnectionState } = this.props;
    if (appConnectionState !== 'failed') {
      return null;
    }
    return <div className="text-grey text-center">Try your network connection</div>;
  }

  render() {
    const { channels, channelsModalState } = this.props;
    const initialValues = channels.reduce((acc, el) => ({ ...acc, [el.name]: el.name }), {});
    return (
      <Modal show={channelsModalState === 'show'} onHide={this.modalHide}>
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
