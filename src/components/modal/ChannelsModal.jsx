import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import connect from '../../connects/connect';
import NewChannelForm from './NewChannelForm';
import ChannelsModalForm from './ChannelsModalForm';

@connect

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
          {this.props.appConnectionState === 'failed' ? <div className="text-grey text-center">Try your network connection</div> : ''}
          {this.state.addChannelForm === 'hide' ? (
            <Button variant="success" className="mb-1" onClick={this.showForm}>
          new channel +
            </Button>
          )
            : (
              <div className="d-flex">
                <NewChannelForm onSubmit={this.newChannelSubmit} />
                <Button variant="warning" onClick={this.hideForm}>
                cancel
                </Button>
              </div>
            )
         }
          <ChannelsModalForm initialValues={initialValues} />
        </Modal.Body>
      </Modal>
    );
  }
}
export default ChannelsModal;
