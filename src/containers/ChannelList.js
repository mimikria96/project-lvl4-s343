import { connect } from 'react-redux';
import Component from '../components/ChannelList';
import * as actionCreators from '../actions';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const props = {
    channels,
    currentChannelId,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
