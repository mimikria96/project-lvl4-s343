import ReactDOM from 'react-dom';
import React from 'react';
import Channels from './components/channels';

export default (props) => {
	ReactDOM.render(<Channels channels={props.channels} />, document.getElementById('channels'));
};
