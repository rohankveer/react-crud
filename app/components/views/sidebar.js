import React from 'react';
import { Link, location } from 'react-router';
import * as userApi from '../../api/user-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';
import { setPaginationState } from '../../actions/user-actions'
import PaginationHeader from '../veneer/pagination_header';
import PaginationNav from '../veneer/pagination_nav';
import PaginationPosition from '../veneer/pagination_position';
import PaginationSize from '../veneer/pagination_size';
var Config = require('Config');

let searchRequest;
const SidebarContainer = React.createClass({
    
  startIndex: 0,
    
  pagination: function(pageNumber){
        this.startIndex = Config.itemsPerPage * ( pageNumber - 1 );
        store.dispatch(setPaginationState(this.startIndex,pageNumber));
        userApi.getUsers();
  },
      
  render: function() {
      let totalUsers = store.getState().userState.totalUsers;
      let totalPages = Math.ceil((totalUsers) / (Config.itemsPerPage));
    return (
        <div className="col-sm-12 col-md-12 rv-siderbar-container">
          <ul className="rv-nav">
            <li className={(window.location.hash.includes("/dashboard/home")) ? "active" : ""}><Link to="/dashboard/home">TrueForm3D Dashboard</Link></li>
            <li className={(window.location.hash.includes("users")) ? "active" : ""}><Link to="/dashboard/users">Customer Data</Link></li>
          </ul>
          {(window.location.hash.includes("users")) ? <PaginationNav
              current_page={this.props.currentPage}
              last_page={totalPages}
              onChange={this.pagination}
              i18n={{
                "previous": "",
                "next": ""
              }} /> : "" }
        </div>
    );
  }

});

export default SidebarContainer;