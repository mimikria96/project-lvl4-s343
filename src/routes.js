const path = '/api/v1';
export default {
  channels: () => [path, 'channels'].join('/'),
  channelChange: id => [path, 'channels', id].join('/'),
  channelAction: id => [path, 'channels', id, 'messages'].join('/'),
};
