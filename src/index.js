import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import app from './app';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
// import gon from 'gon';

if (process.env.NODE_ENV !== 'production') {
	localStorage.debug = 'chat:*';
}
app({ channels: window.gon.channels });
