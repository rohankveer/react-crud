import React from 'react';

import Navbar from '../views/navbar';
import Sidebar from '../views/sidebar';
import { connect } from 'react-redux';

const DashboardContainer = React.createClass({

  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="container-fluid">
          <div className={(window.location.hash.includes("scandata/user/") || window.location.hash.includes("dashboard/scandata/recommended")) ? "hide" : "row"}>
            <Sidebar totalResults={this.props.totalResults} currentPage={this.props.currentPage} />
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 main">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    totalResults: store.userState.totalUsers,
    currentPage: store.userState.currentPage
  };
};

export default connect(mapStateToProps)(DashboardContainer);
