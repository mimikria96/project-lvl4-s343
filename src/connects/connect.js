import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({
  channels, currentChannelId, chatToggleState, channelsModalState, messages, appConnectionState,
}) => {
  const props = {
    channels,
    currentChannelId,
    chatToggleState,
    channelsModalState,
    messages,
    appConnectionState,
  };
  return props;
};

export default function use(Component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(Component);
}

use.mapStateToProps = mapStateToProps;
use.actionCreators = actionCreators;
