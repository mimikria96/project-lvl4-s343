import ReactDOM from 'react-dom';
import React from 'react';
import ChannelList from './components/ChannelList';

export default (props) => {
  ReactDOM.render(<ChannelList channels={props.channels} />, document.getElementById('channels'));
};
