import React from 'react';
import { Router } from 'react-router';
import LoginForm from '../login-form';
import Navbar from '../views/navbar';

const LoginContainer = React.createClass({

  render: function() {
    return (
        <div className="main-wrapper">
          <Navbar />
          <div className="container login-container" style={{backgroundImage:'url(./public/images/ic_shoe_placeholder.png)'}}>
            <LoginForm />
          </div>
          <footer className="login-footer">
            <div className="copyright">
                Privacy policy | Terms and conditions | All rights reserved
            </div>
          </footer>
        </div>
    );
  }

});

LoginContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LoginContainer;
