import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';
import SearchLayoutContainer from './components/containers/search-layout-container';
import DetailsLayoutContainer from './components/containers/details-layout-container';

// Pages
import Home from './components/home';
import LoginContainer from './components/containers/login-container';
import DashboardContainer from './components/containers/dashboard-container';
import DashboardHomeContainer from './components/containers/dashboard-home-container';
import UserListContainer from './components/containers/user-list-container';
import UserProfileContainer from './components/containers/user-profile-container';
import DocumentListContainer from './components/containers/document-list-container';
import DocumentContainer from './components/containers/document-container';
import RecommendedContainer from './components/containers/recommended-container';
import RequireAuth from './components/auth/require-auth';
import UserLoggedin from './components/auth/already-login';

import UserDocumentsListContainer from './components/containers/user-document-list-container';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={UserLoggedin(LoginContainer)} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/dashboard">
        <Route component={DashboardContainer}>
        <Route path="home" component={DashboardHomeContainer}/>
        <Route path="users">
          <Route component={SearchLayoutContainer}>
            <IndexRoute component={RequireAuth(UserListContainer)} />
          </Route>
          <Route path=":userId" component={UserProfileContainer} />
        </Route>
        <Route path="scandata">
            <Route component={SearchLayoutContainer}>
              <IndexRoute component={RequireAuth(DocumentListContainer)} />
            </Route>
            <Route path=":docId" component={DocumentContainer} />
            <Route path="user/:userId/:docType">
              <Route component={DetailsLayoutContainer}>
                <IndexRoute component={RequireAuth(UserDocumentsListContainer)} />
              </Route>
            </Route>
            <Route path="recommended">
                <Route component={DetailsLayoutContainer}>
                    <Route path=":userID" component={RequireAuth(RecommendedContainer)} />
                </Route>
            </Route>
        </Route>
      </Route>
    </Route>
  </Router>
);
