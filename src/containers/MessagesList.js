import { connect } from 'react-redux';
import Component from '../components/MessagesList';
import * as actionCreators from '../actions';

const mapStateToProps = ({ messages, appConnectionState, chatToggleState }) => {
  const props = {
    messages,
    appConnectionState,
    chatToggleState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
