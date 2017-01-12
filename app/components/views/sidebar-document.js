import React from 'react';
import { Link, location } from 'react-router';
import * as userApi from '../../api/user-api';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const UserSidebar = React.createClass({
    
  render: function() {
    return (
        <div className="col-sm-12 col-md-12 rv-siderbar-container">
          <ul className="rv-nav rv-nav-details">
            <li className={(window.location.hash.includes("/dashboard/home")) ? "active" : ""}><Link to="/dashboard/home">Scan Details</Link></li>
            <li className={(window.location.hash.includes("users")) ? "active" : ""}><Link to="/dashboard/users">Recommended Shoes</Link></li>
          </ul>
        </div>
    );
  }

});

export default UserSidebar;

