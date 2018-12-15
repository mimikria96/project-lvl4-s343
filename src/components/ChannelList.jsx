import React from 'react';
import cn from 'classnames';

class ChannelList extends React.Component {
 handleClick = id => (e) => {
   e.preventDefault();
   this.props.toggleChannel({ channelId: id });
 }

 render() {
   const { currentChannelId } = this.props;
   return (
     <div className="text-white bg-info p-2 channel-list">
       <ul>
         {this.props.channels.map(({ id, name }) => {
           const classList = cn({
             badge: true,
             'badge-info': currentChannelId !== id,
             'badge-dark': currentChannelId === id,
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
