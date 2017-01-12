import React from 'react';
import * as loginApi from '../api/login-api';
import { Router,Link } from 'react-router';
var classNames = require("classnames");

const LoginForm = React.createClass({
  getInitialState: function() {
    return {
      email: "amit.marathe@hp.com",
      password: "password",
      error: {
              wrong_email: false,
              wrong_password: false,
              wrong_credentials: false
          },
     signInDisabled: false
    };
  },
  handleSubmit: function(e) {
    //we don't want the form to submit, so we prevent the default behavior
    e.preventDefault();
    if(e.target.className.includes("disabled")){
        return;
    }
    var self = this;
    var email = this.state.email.trim();
    var password = this.state.password;
    if( !email && !password ){
        this.setState({
          error: {
              wrong_email: true,
              wrong_password : true
          }
        });
        return;
    } else if (!email) {
        this.setState({
          error: {
              wrong_email : true
          }
        });
        return;
    } else if(!password) {
        this.setState({
          error: {
              wrong_password : true
          }
        });
        return;
    }

    this.setState({
       signInDisabled: true
    });

    loginApi.loginUser({ email: email, password: password })
    .then(function(data){
       self.context.router.replace('/dashboard/home');
    })
    .catch(function (error) {
        self.setState({
          signInDisabled: false,
          error: {
              wrong_credentials : true
          }
        });
    });

  },
  setValue: function (field, event) {
    //If the input fields were directly within this
    //this component, we could use this.refs.[FIELD].value
    //Instead, we want to save the data for when the form is submitted
    this.setState({
          error: {
              wrong_email : false,
              wrong_password: false
          }
        });
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  },
  render: function() {

      var errorEmailClass = classNames({
          'hide': !(this.state.error.wrong_email),
          'error': true
        });

      var errorPasswordClass = classNames({
          'hide': !(this.state.error.wrong_password),
          'error': true
        });

      var errorCredentialsClass = classNames({
          'hide': !(this.state.error.wrong_credentials),
          'error': true
        });

      var signInClass = classNames(
          'btn','btn-lg','btn-primary','btn-block',
          {
            'disabled': this.state.signInDisabled
          }
      );

    //Each form field is actually another component.
    //Two of the form fields use the same component, but with different variables
    return (
        <form className="form-signin" onSubmit={this.handleSubmit} autoComplete="on">
          <h3 className="form-signin-heading">Sign in to continue</h3>
          <label className="sr-only">Email address</label>
          <input type="email" name="email" className="form-control" placeholder="Email address" value={this.state.email} onChange={this.setValue.bind(this, 'email')} required autofocus/>
          <p className={errorEmailClass}>Email can not be blank.</p>
          <label className="sr-only">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.setValue.bind(this, 'password')} required/>
          <p className={errorPasswordClass}>Password can not be blank.</p>
          <p className={errorCredentialsClass}>Email or Password is wrong.</p>
          <button className={signInClass} type="submit" name="submit" onClick={this.handleSubmit}>Sign in</button>
          <Link className="forgot-password" to="/">Forgot Password?</Link>
        </form>
    );
  }
});

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LoginForm;
