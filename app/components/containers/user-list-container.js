import React from 'react';
import { connect } from 'react-redux';
import UserList from '../views/user-list';
import * as userApi from '../../api/user-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';
import { setFilterState } from '../../actions/user-actions';
import { Router } from 'react-router';

const UserListContainer = React.createClass({

  getInitialState: function() {
        return {
            sortBy: {
                key: "name",
                order: "ascending"
            },
        }
  },

  componentDidMount: function() {
    userApi.getUsers();
    store.dispatch(loadSearchLayout('users', 'User Results'));
  },

  sortByClick: function(sort_by){

      // call api here to get sorted data
      let sort_order = {
                  key: null,
                  order: null
              }

      if(this.state.sortBy.key == sort_by.key){
          let order = (this.state.sortBy.order == "ascending") ? "descending" : "ascending";
          sort_order = {
                  key: sort_by.key,
                  order: order
              }
      } else {
          sort_order = {
                  key: sort_by.key,
                  order: sort_by.order
              }
      }
      this.setState({
              sortBy: sort_order,
            });
      // update store filter criteria
      store.dispatch(setFilterState(sort_order));
      userApi.getUsers();
  },
  showUserInfo : function(userEmail){
     this.context.router.push('/dashboard/scandata/user/' + userEmail + '/ALL');
  },
  show2dScans : function(userEmail){
     this.context.router.push('/dashboard/scandata/user/' + userEmail + '/2D');
  },
  show3dScans : function(userEmail){
     this.context.router.push('/dashboard/scandata/user/' + userEmail + '/3D');
  },
  render: function() {
    return (
      <UserList
      showUserInfo={this.showUserInfo}
      show2dScans={this.show2dScans}
      show3dScans={this.show3dScans}
      users={this.props.users}
      deleteUser={userApi.deleteUser}
      sort={this.sortByClick}
      sortBy={this.state.sortBy}
      />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    users: store.userState.users,
  };
};

UserListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(UserListContainer);
