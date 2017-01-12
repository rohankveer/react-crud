import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const DetailsLayoutContainer = React.createClass({

  getAge: function(dateString){

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        return age;

  },
    
  render: function() {
      let age = this.getAge(this.props.user.age);
      
    return (
        <div className="user-documents-list-container">
                  <div className="user-details">
                    <div className="user-avatar-container">
                        <img className="user-avatar" src={this.props.user.photo?this.props.user.photo:'../../../public/images/ic_profile-placeholder_large.png'} alt={this.props.user.name}/>
                    </div>
                    <div className="user-info-container">
                        <h3>{this.props.user.name}</h3>
                        <p>{this.props.user.email}</p>
                        <p>
                            { (parseInt(age)>0) ?  <span className="rv-age rv-user-details"><img src="./public/images/ic_age.png" />{age}yrs</span> : "" }
                            { (parseInt(this.props.user.weight)>0) ?  <span className="rv-weight rv-user-details"><img src="./public/images/ic_weight.png" />{this.props.user.weight}kgs</span> : "" }
                            { (parseInt(this.props.user.height)>0) ?  <span className="rv-height rv-user-details"><img src="./public/images/ic_height.png" />{this.props.user.height}cm</span> : "" }
                            { (this.props.user.gender == "male") ? <span className="rv-gender rv-user-details"><img src="./public/images/Male.png" />Male</span> : "" }
                            { (this.props.user.gender == "female") ? <span className="rv-gender rv-user-details"><img src="./public/images/Female.png" />Female</span> : "" }
                        </p>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                <div className="rv-page-header">
                    <ul className="rv-nav rv-nav-details">
                        <li className={(window.location.hash.includes("scandata/user/")) ? "active" : ""}><Link to={"/dashboard/scandata/user/"+this.props.user.email+"/ALL"}>Scan Details</Link></li>
                        <li className={(window.location.hash.includes("dashboard/scandata/recommended/")) ? "active" : ""}><Link to={"dashboard/scandata/recommended/"+this.props.user.email}>Recommended Shoes</Link></li>
                    </ul>
                </div>
              <div className="search">
                  <div className="search-results">
                    {this.props.children}
                  </div>
              </div>
          </div>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(DetailsLayoutContainer);
