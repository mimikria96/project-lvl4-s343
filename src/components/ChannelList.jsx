import React from 'react';
import cn from 'classnames';
import connect from '../connects/connect';
import ChannelsModal from './modal/ChannelsModal';
import { channelsSelector } from '../selectors';
import routes from '../routes.js';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const props = {
    channels: channelsSelector(channels),
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelList extends React.Component {
 handleClick = id => (e) => {
   e.preventDefault();
   this.props.toggleChannel({ channelId: id });
 }

 modalOpen = () => {
   this.props.channelsModalShow();
 }

 render() {
   const { currentChannelId, channels } = this.props;
   return (
     <div className="text-white bg-primary p-2 channel-list">
       <button type="button" className="btn btn-primary" onClick={this.modalOpen}>
        Channels
       </button>
       <ChannelsModal />
       <ul className="list-unstyled">
         {channels.map(({ id, name }) => {
           const classList = cn({
             'text-white': currentChannelId !== id,
             'text-dark': currentChannelId === id,
           });
           return (
             <li key={id}>
               <a className={classList} onClick={this.handleClick(id)} href={routes.channelAction(id)}>{name}</a>
             </li>
           );
         })}
       </ul>
     </div>
   );
 }
}

export default ChannelList;
