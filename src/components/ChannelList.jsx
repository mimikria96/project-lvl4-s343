import React from 'react';

const ChannelList = ({ channels }) => <ul>{channels.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>;

export default ChannelList;
