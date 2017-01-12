import React from 'react';

import Navbar from '../views/navbar';
import Sidebar from '../views/sidebar';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';
import * as documentApi from '../../api/document-api';
import { setPaginationState } from '../../actions/user-actions';
import store from '../../store';
var BarChart = require("react-chartjs").Bar;
var PieChart = require("react-chartjs").Pie;
import * as dataFunctions from '../../functions/graph-functions.js';

const DashboardContainer = React.createClass({

  pieData: [],
    
  componentDidMount: function(){
      
            userApi.getTotalUsers();
            documentApi.getDocuments();
      
  },
    
  componentWillUpdate: function(){
      if( this.props.users.length > 0 ){
          this.pieData = dataFunctions.getShoeSizeDistribution(this.props.users);
      }
  },
    
  componentDidUpdate: function(){
      if (document.getElementById("pie-legend")) {
            legend(document.getElementById('pie-legend'), this.pieData);   
      }
  },
    
  componentWillUnmount: function(){
    this.pieData = [];  
    this.props.scans.length = 0;
    store.dispatch(setPaginationState(0,1));
  },
    
  render: function() {
      
      /* dimensions for canvas graph */
      let width = 490;
      let height = 300; 
      let pie_height = 240;
      let active_users_width = 700;
      if( window.mobilecheck() ){
        width = 225;
        height = 200;  
        pie_height = 200;
        active_users_width = 225;
      }
      
      let total_users = dataFunctions.getUsers(this.props.users).length;
      let total_2d = dataFunctions.getScans(this.props.scans,"2D").length;
      let total_3d = dataFunctions.getScans(this.props.scans,"3D").length;
      let scans_per_month = dataFunctions.getScansPerMonth(this.props.scans);
      let active_users_per_month = dataFunctions.getActiveUsersPerMonth(this.props.users);
      
      let chartData = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(37, 116, 169, 1)",
                        strokeColor: "rgba(37, 116, 169, 1)",
                        data: scans_per_month,
                    }
                ]
            };
      
      let customersChartData = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(37, 116, 169, 1)",
                        strokeColor: "rgba(37, 116, 169, 1)",
                        data: active_users_per_month,
                    }
                ]
            };
      
      // render iff both api has been completed
      
      if( this.props.scans.length > 0 && this.pieData.length > 0 ){
            return (
                  <div className="dashboard-container">
                    <div className="row rv-dashboard-row">
                        <div className="col-md-4 rv-dashboard-4 rv-total-2d-dashboard">
                            <div className="rv-total-2d">
                                <p>TOTAL 2D SCANS</p>
                                <p className="rv-total">{total_2d}</p>
                            </div>
                            <div className="rv-total-icon">
                                <span className="glyphicon glyphicon-list-alt"></span>
                            </div>
                        </div>
                        <div className="col-md-4 rv-dashboard-4 rv-total-3d-dashboard">
                            <div className="rv-total-3d">
                                <p>TOTAL 3D SCANS</p>
                                <p className="rv-total">{total_3d}</p>
                            </div>
                            <div className="rv-total-icon">
                                <span className="glyphicon glyphicon-list-alt"></span>
                            </div>
                        </div>
                        <div className="col-md-4 rv-dashboard-4 rv-total-cust-dashboard">
                            <div className="rv-total-customers">
                                <p>TOTAL CUSTOMERS</p>
                                <p className="rv-total">{total_users}</p>
                            </div>
                            <div className="rv-total-cust-icon">
                                <span className="glyphicon glyphicon-user"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row rv-dashboard-row-bottom">
                        <div className="col-md-6">
                            <h3>Shoe Size Distribution</h3>
                            <div className="dashboard-graph-container" id="canvas-graph">
                                <PieChart data={this.pieData} width={width} height={pie_height} redraw />
                                <div id="pie-legend"></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>Scans Per Month</h3>
                            <div className="dashboard-graph-container">
                                <BarChart id="scans-per-month" data={chartData} width={width} height={height} />
                            </div>
                        </div>
                    </div>
                    <div className="row rv-dashboard-row-bottom">
                        <div className="col-md-12">
                            <h3>Active Customers Per Month</h3>
                            <div className="dashboard-graph-container">
                                <BarChart id="scans-per-month" data={customersChartData} width={active_users_width} height={height} />
                            </div>
                        </div>
                    </div>
                  </div>
                );    
      } else {
          return(
            <div className="dashboard-container">
                <div className="rv-loader"></div>  
            </div>
          );
      }
      
  }

});

const mapStateToProps = function(store) {
  return {
    users: store.userState.totalUsersArray,
    scans: store.documentState.documents
  };
};

export default connect(mapStateToProps)(DashboardContainer);
