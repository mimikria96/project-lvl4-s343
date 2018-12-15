import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import Cookeis from 'js-cookie';
import faker from 'faker';
import app from './index.jsx';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
if (!Cookeis.get('UserName')) {
  Cookeis.set('UserName', faker.internet.userName());
}

app(gon);
