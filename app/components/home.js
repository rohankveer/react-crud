import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>user-app</h1>
          <p>Sample react app for userlist and scan data</p>
          <Link className="btn btn-primary" to="/login">Login</Link>
        </div>
      </div>
    );
  }
});

export default Home;
