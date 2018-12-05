import React from 'react';

const Channels = ({ channels }) => <ul>{channels.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>;

export default Channels;
