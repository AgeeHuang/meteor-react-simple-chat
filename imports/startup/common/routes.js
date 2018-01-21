import React, { Component } from 'react';
import {
  Route,
  Switch,
  Router,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import App from '../../ui/components/App';
import Login from '../../ui/components/user/Login';
// import Register from '../../ui/components/user/register';
import About from '../../ui/components/About';
import MemberListContainer from '../../ui/components/user/MemberListContainer';
import PageNotFound from '../../ui/components/PageNotFound';
import ChatContainer from '../../ui/components/chat/ChatContainer';

const history = createHistory();

const AppRoutes = (
  <Router history={history}>
    <ChatContainer>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/about" component={ About } />
        <Route exact path="/list" component={ MemberListContainer } />
        <Route path="/_oauth/facebook" component={ About } />
        <Route path="*" component={ PageNotFound } status={404} />
      </Switch>
    </ChatContainer>
  </Router>
);



export default AppRoutes;
