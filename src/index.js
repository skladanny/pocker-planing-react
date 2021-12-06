import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import HttpService from './services/HttpService';
import UserService from './services/UserService';

const renderApp = () =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(<App />, document.getElementById('app'));

UserService.initKeycloak(renderApp);
HttpService.configure();
