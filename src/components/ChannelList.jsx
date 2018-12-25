import React from 'react';
import cn from 'classnames';
import connect from '../connects/connect';
import ChannelsModal from './modal/ChannelsModal';

@connect

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
               <a className={classList} onClick={this.handleClick(id)} href={`/channels/${id}/messages`}>{name}</a>
             </li>
           );
         })}
       </ul>
     </div>
   );
 }
}

export default ChannelList;
