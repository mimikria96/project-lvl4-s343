import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
/* eslint import/no-unresolved: 0 */
import gon from 'gon';
import Cookies from 'js-cookie';
import faker from 'faker';
import app from './index.jsx';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
if (!Cookies.get('UserName')) {
  Cookies.set('UserName', faker.internet.userName());
}

app(gon);
