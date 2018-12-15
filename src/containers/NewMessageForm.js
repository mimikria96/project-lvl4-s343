import { connect } from 'react-redux';
import Component from '../components/NewMessageForm';
import * as actionCreators from '../actions';

const mapStateToProps = ({ messageCreatingState, appConnectionState, currentChannelId }) => {
  const props = {
    messageCreatingState,
    currentChannelId,
    appConnectionState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
